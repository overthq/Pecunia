// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

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

		paid[msg.sender] = true;
	}
}
