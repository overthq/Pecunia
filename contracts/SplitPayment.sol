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

		if ((currentBalance + msg.value) == totalAmount) {
			address(uint160(targetAddress)).transfer(this.getPaymentBalance());
		}
	}
}
