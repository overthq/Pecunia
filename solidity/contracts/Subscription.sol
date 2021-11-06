// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Modification: https://github.com/austintgriffith/token-subscription/blob/master/Subscription/Subscription.sol

contract Subscription is Ownable {
	using ECDSA for bytes32;

	address payable publisher;

	constructor() {}

	event Received(address indexed sender, uint value);

	event ExecuteSubscription(
		address indexed from,
		address indexed to,
		address tokenAddress,
		uint256 tokenAmount,
		uint256 periodSeconds,
		address gasToken,
		uint256 gasPrice,
		address gasPayer
	);

	event FailedExecuteSubscription(
		address indexed from,
		address indexed to,
		address tokenAddress,
		uint256 tokenAmount,
		uint256 periodSeconds,
		address gasToken,
		uint256 gasPrice,
		address gasPayer
	);

	mapping(bytes32 => uint256) public nextValidTimestamp;
	mapping(bytes32 => bool) public publisherSigned;

	function signSubscriptionHash(bytes32 subscriptionHash) public onlyOwner returns(bool) {
		publisherSigned[subscriptionHash] = true;
		return true;
	}

	function isSubscriptionActive(bytes32 subscriptionHash, uint256 gracePeriodSeconds) external view returns (bool) {
		return (block.timestamp >= (nextValidTimestamp[subscriptionHash] + gracePeriodSeconds));
	}

	function getSubscriptionHash(
		address from,
		address to,
		address tokenAddress,
		uint256 tokenAmount,
		uint256 periodSeconds,
		address gasToken,
		uint256 gasPrice,
		address gasPayer
	) public view returns (bytes32) {
		return keccak256(
			abi.encodePacked(
				bytes1(0x19),
				bytes1(0),
				address(this),
				from,
				to,
				tokenAddress,
				tokenAmount,
				periodSeconds,
				gasToken,
				gasPrice,
				gasPayer
			)
		);
	}

	function getSubscriptionSigner(
		bytes32 subscriptionHash,
		bytes memory signature
	) public pure returns (address) {
		return subscriptionHash.toEthSignedMessageHash().recover(signature);
	}

	function isSubscriptionReady(
		address from,
		address to,
		address tokenAddress,
		uint256 tokenAmount,
		uint256 periodSeconds,
		address gasToken,
		uint256 gasPrice,
		address gasPayer,
		bytes memory signature
	) public view returns (bool) {
		bytes32 subscriptionHash = getSubscriptionHash(
			from, to, tokenAddress, tokenAmount, periodSeconds, gasToken, gasPrice, gasPayer
		);
		address signer = getSubscriptionSigner(subscriptionHash, signature);
		uint256 allowance = ERC20(tokenAddress).allowance(from, address(this));
		return (
			signer == from &&
			block.timestamp >= nextValidTimestamp[subscriptionHash] &&
			allowance >= tokenAmount
		);
	}

	function cancelSubscription(
		address from,
		address to,
		address tokenAddress,
		uint256 tokenAmount,
		uint256 periodSeconds,
		address gasToken,
		uint256 gasPrice,
		address gasPayer,
		bytes memory signature
	) public returns (bool success) {
		bytes32 subscriptionHash = getSubscriptionHash(
			from, to, tokenAddress, tokenAmount, periodSeconds, gasToken, gasPrice, gasPayer
		);
		address signer = subscriptionHash.toEthSignedMessageHash().recover(signature);

		require(signer == from, "Invalid Signature for subscription cancellation");

		nextValidTimestamp[subscriptionHash]=99999999999;

		return true;
	}

	function executeSubscription(
		address from,
		address to,
		address tokenAddress,
		uint256 tokenAmount,
		uint256 periodSeconds,
		address gasToken,
		uint256 gasPrice,
		address gasPayer,
		bytes memory signature
	) public returns (bool success) {
		bytes32 subscriptionHash = getSubscriptionHash(
			from, to, tokenAddress, tokenAmount, periodSeconds, gasToken, gasPrice, gasPayer
		);
		address signer = getSubscriptionSigner(subscriptionHash, signature);

		require(signer == from, "Invalid Signature");
		require(
			block.timestamp >= nextValidTimestamp[subscriptionHash],
			"Subscription is not ready"
		);
			
		nextValidTimestamp[subscriptionHash] = block.timestamp + periodSeconds;
		bool result = ERC20(tokenAddress).transferFrom(from,to,tokenAmount);

		if (result) {
			emit ExecuteSubscription(
				from, to, tokenAddress, tokenAmount, periodSeconds, gasToken, gasPrice, gasPayer
			);
		} else {
			emit FailedExecuteSubscription(
				from, to, tokenAddress, tokenAmount, periodSeconds, gasToken, gasPrice, gasPayer
			);
		}

		if (gasPrice > 0) {
			if (gasToken == address(0)) {
				require(from == owner() || publisherSigned[subscriptionHash], "Publisher has not signed this subscriptionHash");
				(bool s,) = msg.sender.call{ value: gasPrice, gas: 36000 }("");
				require(s, "Subscription contract failed to pay ether to relayer");
			} else if (gasPayer == address(this) || gasPayer == address(0)) {
				require(from == owner() || publisherSigned[subscriptionHash], "Publisher has not signed this subscriptionHash");
				require(ERC20(gasToken).transfer(msg.sender, gasPrice), "Failed to pay gas as contract");
			} else if (gasPayer == from) {
				require(ERC20(gasToken).transferFrom(from, msg.sender, gasPrice), "Failed to pay gas as from account");
			} else {
				revert("The gasPayer is invalid");
			}
		}

		return result;
	}

	receive() external payable {
		emit Received(msg.sender, msg.value);
	}
}
