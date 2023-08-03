import mongoose, { ObjectId, Schema } from 'mongoose';

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const postSchema = new Schema<IPost>({
	userId: {
		type: Number,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	body: String,
});

const postModel = mongoose.model<IPost>('post', postSchema);

export default postModel;
