import { Response, Request } from 'express';
import postModel, { IPost } from '../models/posts.models';
interface IData {
	posts: IPost;
	total: number;
	limit: number;
	skip: number;
}
export async function getData(req: Request, res: Response) {
	try {
		const limit: number = +(req.query.limit || 20);
		const page: number = +(req.query.page || 1);
		const skip: number = +(req.query.skip || 0);
		const sort: number = +(req.query.sort || 1);
		const sortType: string = req.query.sort_type?.toString() || 'id';
		const q: string = (req.query.q || '').toString();
		const count = await postModel.find({}).count({});
		let data: any = await postModel.find(
			{ $or: [{ title: { $regex: q, $options: 'i' } }, { body: { $regex: q, $options: 'i' } }] },
			{ _id: 0 },
			{ sort: { [sortType]: +sort }, limit: +limit, skip: (+page - 1) * +limit + +skip },
		);
		const fullData: IData = {
			posts: data,
			total: count,
			limit: data.length,
			skip,
		};
		res.json(fullData);
	} catch (error: any) {}
}
