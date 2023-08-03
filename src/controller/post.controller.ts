import { Response, Request } from 'express';
import postModel, { IPost } from '../models/posts.models';
interface IData {
	posts: IPost;
	limit: number;
	skip: number;
}
export async function getData(req: Request, res: Response) {
	try {
		const limit: any = req.query.limit || 20;
		const page: any = req.query.page || 1;
		const skip: any = req.query.skip || 0;
		const sort: any = req.query.sort || 1;
		const sortType: any = req.query.sort_type || 'id';
		const q: any = req.query.q || '';
		const count = await postModel.find({}).count({});
		let data = await postModel.find(
			{ $or: [{ title: { $regex: q, $options: 'i' } }, { body: { $regex: q, $options: 'i' } }] },
			{ _id: 0 },
			{ sort: { [sortType]: sort }, limit, skip: (page - 1) * limit + skip },
		);
		const fullData: any = {
			posts: data,
			total: count,
			limit: data.length,
			skip,
		};
		res.json(fullData);
	} catch (error: any) {}
}
