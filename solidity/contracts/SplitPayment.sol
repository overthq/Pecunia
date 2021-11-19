// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// TODO:
// Create separate contract to support ERC20 tokens as well.
// This shouldn't be to hard, as the math remains the same.

contract SplitPayment {
	address[] public participants;
	mapping (address => uint) public splitAmount;
	mapping (address => bool) public paid;
	address payable public target;

	constructor(
		address[] memory _participants,
		uint256[] memory _participantConbributions,
		address payable _target
	) {
		participants = _participants;
		target = _target;

		for (uint256 i = 0; i < _participants.length; i++) {
			splitAmount[_participants[i]] = _participantConbributions[i];
			paid[_participants[i]] = false;
		}
	}

	function contribute() external payable {
		require(msg.value == splitAmount[msg.sender], "You have to pay the correct amount");
		// At the end of every contribution, check if everybody has paid?
		// Or just watch a contract and check that off-chain?
		// Going with the latter for now.

		paid[msg.sender] = true;
	}
}
