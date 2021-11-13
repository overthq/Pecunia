import { Router } from 'express';
import { ethers } from 'ethers';
import { User, Subscription } from './models';

const routes = Router();

// API Specifications:
// /users/add
// /users/delete/:userId
// /subscriptions
// /subscriptions/new
// /subscriptions/cancel -> probably can be handled by direct interfacing with the smart contract
// /subscriptions/execute

routes.post('/users/add', async (req, res) => {
  const { address, ens, pushToken } = req.body;
  // Do we want to store ENS or just look it up?
  const user = new User({ address, ens, pushToken });
  await user.save();

  return res.status(201).json({
    success: true,
    data: {
      message: 'User successfully created',
      user
    }
  });
});

routes.post('/users/delete/:userId', async (req, res) => {
  const { userId } = req.params;

  await User.findByIdAndRemove(userId);

  return res.status(200).json({
    success: true,
    data: {
      message: 'User successfully deleted.'
    }
  });
});

routes.get('/subscriptions/:address', async (req, res) => {
  const { address } = req.params;
  const subscriptions = await Subscription.find({ address });

  return res.status(200).json({
    success: true,
    data: { subscriptions }
  });
});

// Store the hash, signature, sender, and receiver
// Find out what parts is.
/*
	address from,          // the subscriber
	address to,            // the publisher
	address tokenAddress,  // the token address paid to the publisher
	uint256 tokenAmount,   // the token amount paid to the publisher
	uint256 periodSeconds, // the period in seconds between payments
	address gasToken,      // the address of the token to pay relayer (0 for eth)
	uint256 gasPrice,      // the amount of tokens or eth to pay relayer (0 for free)
	address gasPayer,      // the address that will pay the tokens to the relayer
 */

// const parts = [
//   this.state.account,
//   this.state.toAddress,
//   tokenAddress,
//   web3.utils.toTwosComplement(tokenAmount*10**18),
//   web3.utils.toTwosComplement(periodSeconds),
//   gasToken,
//   web3.utils.toTwosComplement(gasPrice*10**18),
//   gasPayer,
// ]

routes.post('/subscriptions/new', async (req, res) => {
  const { hash, signature, parts } = req.body;

  const address = ethers.utils.recoverAddress(hash, signature);

  if (address.toLowerCase() === parts[0].toLowerCase()) {
    const subscription = new Subscription({ hash, signature, parts });
    await subscription.save();

    return res.status(201).json({
      success: true,
      data: {
        message: 'Subscription successfully added',
        subscription
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      data: {
        message: 'Address does not match'
      }
    });
  }
});

export default routes;
