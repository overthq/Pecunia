pragma solidity ^0.8.4;

contract SplitPayment {
	address[] public participants;
	mapping (address => uint) public splitAmount;
	uint public totalAmount;
	address public targetAddress;

	constructor(address[] _participants, uint _totalAmount) {
		totalAmount = _totalAmount;
		participants = _participants;
	}

	function getPaymentBalance() {
		return (address(this)).balance;
	}

	// This contract is not complete.
	// The edge case of when all participants have contributed some amount,
	// but the target amount has still not been reached has to be handled.

	function contributeSplit() external payable {
		uint currentBalance = this.getPaymentBalance();

		require(msg.value <= (totalAmount - currentBalance));

		// IMPORTANT: How to add the value to the contract, or is that automatic, since this payable?
		splitAmount[msg.sender] = msg.value;

		if ((currentBalance + msg.value) == totalAmount) {
			address(uint160(targetAddress)).transfer(this.getPaymentBalance());
		}
	}
}
