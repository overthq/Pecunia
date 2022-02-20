pragma solidity ^0.8.0;

contract Split {
	address[] participants;
	uint256[] splits;
	address immutable token;
	uint256 target;
	address immutable recepient;

	mapping(address => bool) paid;
	bool settled;

	constructor(
		address[] memory _participants,
		address[] memory _splits,
		address _token,
		uint256 _target,
		address _recepient
	) public {
		participants = _participants;
		splits = _splits;
		token = _token,
		target = _target,
		recepient = _recepient
	}

	/*
		 Accept both ETH and ERC20 payments from user.
	 */

	function contribute() external payable {
		if (token == address(0)) {
			require (msg.value == splits[msg.sender]);
		} else {
			uint balance = IERC20(token).balanceOf(msg.sender);
			require(balance == splits[msg.sender]);
		}
	}

	/*
		 Returns splits to all contributing participants.
		 Maps over contributions and returns their exact split amount.
	 */

	function refund() external {

	}

	/*
		 Check if the target amount has been reached.
		 If it has, send funds to recepient.
	 */

	function settle() internal {
		uint balance;

		if (token == address(0)) {
			balance = address(this).balance;
		} else {
			balance = IERC20(token).balanceof(address(this));
		}

		if (balance == target) {
			if (token == address(0)) {
				recepient.call{ value: balance }("");
			} else {
				IERC20(token).transferFrom(address(this), recepient, balance);
			}
		}
	}
}
