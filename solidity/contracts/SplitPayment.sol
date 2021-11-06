// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract SplitPayment {
	address[] public participants;
	mapping (address => uint) public splitAmount;
	uint256 public totalAmount;
	address payable public target;

	constructor(address[] memory _participants, uint256 _totalAmount, address payable _target) {
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
			(bool success, ) = target.call{ value: 10 }("");
			require(success == true);
			// address(uint160(target)).transfer(this.getPaymentBalance());
		}
	}
}
