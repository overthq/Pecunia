// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol
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

// Specification: SplitPayment contract
// This contract should enable users split payments with other users.
// It includes:
// - Support for both ETH and ERC20 tokens.
//   (For simplicity, you must pick one of the two at contract creation).
// - Different split types:
//   - Equal amounts (basic split, share is totalAmount / numberOfParticipants)
//   - Percentage splits (fractional splits, all add up to 1).
//   - Custom splits (contract creator predetermines the amount to be paid by each user).
// 
// Considerations:
// - Should the owed amount (per participant) be calculated off-chain?

// SplitConfig:
// address[] participants
// uint256[] amounts
// 


// For simplicity, this implementation will not be aware of the split logic
// All it should take is an array of addresses (participants),
// an array of their respective amounts, and
// target amount and address.


contract SplitPayment {
	address[] public participants;
	mapping (address => uint) public splitAmount;
	mapping (address => bool) public paid;
	mapping (address => Payment) public payments;
	address payable public target;
	SplitPaymentType splitType;
	address creator;
	bool settled;
	address tokenAddress;

	// Use this for a splitConfig.
	// splitConfig should describe what the exact breakdown of the splits are.

	enum SplitPaymentType {
		EqualSplit,
		Percentage,
		Custom
	}

	struct Payment {
		address contributor;
		uint amount;
		address tokenAddress;
	}

	constructor(
		address[] memory _participants,
		uint256[] memory _participantConbributions,
		address payable _target,
		SplitPaymentType _splitType,
		address _tokenAddress
	) {
		participants = _participants;
		target = _target;
		splitType = _splitType;
		tokenAddress = _tokenAddress;

		_setSplitAmounts(_participantConbributions);
	}

	modifier onlyCreator {
		require(msg.sender == creator, "Only the contract creator can trigger this function");
		_;
	}

	modifier notSettled {
		require(settled == false, "This payment has been settled already");
		_;
	}

	function _setSplitAmounts(uint256[] memory _participantConbributions) internal {
		for (uint256 i = 0; i < participants.length; i++) {
			splitAmount[participants[i]] = _participantConbributions[i];
			paid[participants[i]] = false;
		}
	}

	function contribute() external payable {
		require(msg.value == splitAmount[msg.sender], "You have to pay the correct amount");

		payments[msg.sender] = Payment(msg.sender, msg.value, address(0));
		paid[msg.sender] = true;

		emit ContributionAdded(msg.sender, msg.value, address(0));
	}

	// Remove this method. Use (tokenAddress == address(0)) check for ether.

	function contributeERC20(address _tokenAddress, uint amount) external {
		uint balance = IERC20(_tokenAddress).balanceOf(msg.sender);

		require(balance >= splitAmount[msg.sender]);

		IERC20(_tokenAddress).transferFrom(msg.sender, address(this), amount);

		paid[msg.sender] = true;
	}

	function refund() external onlyCreator notSettled {
		for (uint256 i = 0; i < participants.length; i++) {
			address payable recepient = payable(participants[i]);

			(bool sent,) = recepient.call{ value: payments[participants[i]].amount }("");

			require(sent == true, "Refund failed");
			emit PaymentRefunded(participants[i], splitAmount[participants[i]], tokenAddress);
		}
	}

	event ContributionAdded(address indexed contributor, uint amount, address tokenAddress);
	event PaymentRefunded(address indexed contributor, uint amount, address tokenAddress);
}
