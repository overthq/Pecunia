// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract Split {
	address[] participants;
	uint256[] splits;
	address immutable token;
	uint256 immutable target;
	address immutable recepient;

	address immutable creator;
	mapping(address => uint256) splitMap;
	mapping(address => bool) paid;
	bool settled;

	constructor(
		address[] memory _participants,
		uint256[] memory _splits,
		address _token,
		uint256 _target,
		address _recepient
	) {
		require(participants.length == splits.length, "Lengths must be the same");

		participants = _participants;
		splits = _splits;
		_loadSplitMap();

		token = _token;
		target = _target;
		recepient = _recepient;
		creator = msg.sender;
	}

	event RefundSuccessful(address indexed refundee, uint256 amount);

	modifier onlyCreator {
		require(msg.sender == creator, "Only the creator can call this function");
		_;
	}

	function _loadSplitMap() internal {
		for (uint256 i = 0; i < participants.length; i++) {
			splitMap[participants[i]] = splits[i];
			paid[participants[i]] = false;
		}
	}

	/* Accept both ETH and ERC20 payments from user. */

	function contribute() external payable {
		if (token == address(0)) {
			require (msg.value == splitMap[msg.sender]);
		} else {
			uint balance = IERC20(token).balanceOf(msg.sender);
			require(balance == splitMap[msg.sender]);
		}

		_settle();
	}

	/*
		 Return splits to all contributing participants.
		 Loops over splits and returns the split amount to the participant.
		 (If tney have contributed)
	 */

	function refund() external {
		for (uint256 i = 0; i < participants.length; i++) {
			address participant = participants[i];
			if (paid[participant] == true) {
				(bool success, ) = payable(participant).call{ value: splits[i] }("");
				require(success == true, "Refund attempt unsuccessful");

				emit RefundSuccessful(participant, splits[i]);
			}
		}
	}

	/*
		 Check if the target amount has been reached.
		 If it has, send funds to recepient.
	 */

	function _settle() internal {
		uint balance;

		if (token == address(0)) {
			balance = address(this).balance;
		} else {
			balance = IERC20(token).balanceOf(address(this));
		}

		if (balance == target) {
			if (token == address(0)) {
				(bool success, ) = recepient.call{ value: balance }("");
				require(success == true, "Settlement failed");
			} else {
				bool success = IERC20(token).transferFrom(address(this), recepient, balance);
				require(success == true, "Settlement failed");
			}
		}
	}

	function tokenAddress() external view returns (address) {
		return token;
	}

	function splitBalance() external view returns (uint256) {
		return address(this).balance;
	}

	function splitTarget() external view returns (uint256) {
		return target;
	}

	function shareOf(address _participant) external view returns (uint256) {
		return splitMap[_participant];
	}

	function hasPaid(address _participant) external view returns (bool) {
		return paid[_participant];
	}
}
