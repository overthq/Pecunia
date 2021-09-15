pragma solidity ^0.8.4;

contract SplitPayment {
	address[] public participants;
	mapping (address => uint) public splitAmount;
	uint256 public totalAmount;
	address payable public target;

	constructor(address[] _participants, uint256 _totalAmount, address payable target) {
		totalAmount = _totalAmount;
		participants = _participants;
		target = _target;
	}

	// This contract is not complete.
	// The edge case of when all participants have contributed some amount,
	// but the target amount has still not been reached has to be handled.
	// Simple workaround: only support equal splits (to reduce the math needed).

	function contribute() external payable {
		uint256 currentBalance = (address(this)).balance;

		require(msg.value <= (totalAmount - currentBalance));

		splitAmount[msg.sender] = msg.value;

		if ((currentBalance + msg.value) == totalAmount) {
			address(uint160(target)).transfer(this.getPaymentBalance());
		}
	}
}
