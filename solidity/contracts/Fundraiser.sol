// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// TODO:
// - Support ERC20 tokens

// Figure out if withdrawals should work when the funding goal has not been met.

contract Fundraiser {
	address payable owner;
	mapping(address => uint) public contributions; 
	string public name;
	string public description;
	uint public minimumContribution;
	uint public fundingGoal;
    
	constructor(
		string memory _name,
		string memory _description,
		uint _minimumContribution,
		uint _fundingGoal
	) {
		owner = payable(msg.sender);
		name = _name;
		description = _description;
		minimumContribution = _minimumContribution;
		fundingGoal = _fundingGoal;
	}

	event ContributionReceived(address indexed sender, uint value);
	event WithdrawSuccessful(uint amount);

	modifier onlyOwner() {
		require(payable(msg.sender) == owner, 'Only the owner can carry out this action');
		_;
	}

	function getMetadata() external view returns(string memory, string memory, uint, uint) {
		return (name, description, fundingGoal, minimumContribution);
	}
	
	function getContributionBalance() external view returns(uint) {
		return (address(this)).balance;
	}

	function withdraw() public onlyOwner {
		uint amount = this.getContributionBalance();
		(bool success, ) = owner.call{ value: amount }("");
		require(success, "Withdraw was not successful");
		emit WithdrawSuccessful(amount);
	}

	function getContribution(address _contributor) public view returns(uint) {
		return contributions[_contributor];
	}
	
	receive() external payable {
		require(msg.value >= minimumContribution, "You have to contribute at least the minimum contribution amount");

		contributions[msg.sender] = msg.value;
		emit ContributionReceived(msg.sender, msg.value);
	}
}
