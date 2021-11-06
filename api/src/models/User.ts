import { model, Schema, Document } from 'mongoose';

export interface UserType extends Document {
	address: string;
	ens?: string;
	pushToken: string;
}

const UserSchema = new Schema({
	address: {
		type: String,
		required: true,
		unique: true
	},
	ens: {
		type: String,
		required: false,
		unique: true
	},
	pushToken: {
		type: String,
		required: true,
		unique: true
	}
});

export const User = model<UserType>('User', UserSchema);

