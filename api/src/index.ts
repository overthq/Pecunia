import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(Number(process.env.PORT), () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
