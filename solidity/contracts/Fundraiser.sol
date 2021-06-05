pragma solidity ^0.8.4;

contract Fundraiser {
	address payable owner;
	mapping(address => uint) public contributions; 
	string public name;
	string public description;
	uint public minimumContribution;
	uint public fundingGoal;
    
	constructor(
		string _name,
		string _description,
		uint _minimumContribution,
		uint _fundingGoal
	) {
		owner = msg.sender;
		name = _name;
		description = _description;
		minimumContribution = _minimumContribution;
		fundingGoal = _fundingGoal;
	}
	
	function getContributionBalance() external view returns(uint) {
		return (address(this)).balance;
	}

	function withdraw() {
		// Should this be prevented until the funds are at the goal?
		require(payable(msg.sender) == owner, 'Only the owner can withdraw funds');
		owner.transfer(this.getContributionBalance());
	}
	
	receive() external payable {
		uint balance = this.getContributionBalance();
		require(msg.value >= minimumContribution);

		contributions[msg.sender] = msg.value;
		
		// if((balance + msg.value) >= fundingGoal) {
		// 	owner.transfer(this.getContributionBalance());
		// }
	}
}
