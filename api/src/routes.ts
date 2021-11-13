import { Router } from 'express';
import { User, Subscription } from './models';

const routes = Router();

// API Specifications:
// /users/add
// /users/delete
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

routes.post('/subscriptions/new', async (req, res) => {
  const { hash } = req.body;

  const subscription = new Subscription({ hash });

  await subscription.save();

  return res.status(201).json({
    success: true,
    data: {
      message: 'Subscription successfully added',
      subscription
    }
  });
});

export default routes;
