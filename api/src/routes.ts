import {  Router } from 'express';
import { User } from './models';

const routes = Router();

routes.post('/users/add', async (req, res) => {
	const { address, ens, pushToken } = req.body;
	const user = new User({ address, ens, pushToken });

	await user.save();

	return res.status(200).json({
		success: true,
		data: {
			message: 'User successfully created',
			user
		}
	});
});

export default routes;
