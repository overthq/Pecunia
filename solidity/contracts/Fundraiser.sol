// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// TODO:
// - Support ERC20 tokens:
//   This might require a separate contract, since Solidity doesn't support constructor overloading.
// - Figure out proper data structure to enable getting the list of contributions easily.
//   Maybe store an array of contribution structs?
//   Or an array of keys, and an array of values, so we can map those in JS.

contract Fundraiser {
	address payable owner;
	mapping(address => uint) public contributions; 
	string public name;
	string public description;
	uint public minimumContribution;
	uint public fundingGoal;
	uint public amountRaised;
    
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

	modifier fundraiserOpen() {
		require(amountRaised < fundingGoal, "The funding goal has already been met");
		_;
	}

	function getMetadata() external view returns(string memory, string memory, uint, uint) {
		return (name, description, fundingGoal, minimumContribution);
	}
	
	function getContributionBalance() external view returns(uint) {
		return address(this).balance;
	}

	function withdraw() public onlyOwner {
		uint amount = address(this).balance;

		(bool success, ) = owner.call{ value: amount }("");
		require(success, "Withdraw was not successful");
		emit WithdrawSuccessful(amount);
	}

	function getContribution(address _contributor) public view returns(uint) {
		return contributions[_contributor];
	}
	
	receive() external payable fundraiserOpen {
		require(msg.value >= minimumContribution, "You have to contribute at least the minimum contribution amount");

		contributions[msg.sender] = msg.value;
		amountRaised += msg.value;

		emit ContributionReceived(msg.sender, msg.value);
	}
}
