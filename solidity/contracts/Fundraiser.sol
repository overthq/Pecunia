pragma solidity ^0.8.4;

// TODO:
// - Write failing tests
// - Support ERC20 tokens

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

	modifier onlyOwner() {
		require(payable(msg.sender) == owner, 'Only the owner can carry out this action');
		_;
	}
	
	function getContributionBalance() external view returns(uint) {
		return (address(this)).balance;
	}

	function withdraw() public onlyOwner {
		owner.transfer(this.getContributionBalance());
	}

	function getContribution(address _contributor) public view returns(uint) {
		return contributions[_contributor];
	}
	
	receive() external payable {
		uint balance = this.getContributionBalance();
		require(msg.value >= minimumContribution);

		contributions[msg.sender] = msg.value;
	}
}
