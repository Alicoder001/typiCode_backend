import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

async function runServer() {
	try {
		await mongoose.connect('mongodb+srv://coderkuchkarov:mgolibjon2001@cluster0.z8fbbhg.mongodb.net/posts?retryWrites=true&w=majority' as string);
		app.listen(3000, () => {
			console.log('server started...!');
		});
	} catch (error) {
		console.log('salom');
	}
}
runServer();
