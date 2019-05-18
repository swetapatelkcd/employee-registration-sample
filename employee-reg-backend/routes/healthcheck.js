import {Router} from 'express';

let healthcheckRouter = () => {
	const router = Router();

	router.get('/healthcheck', (req, res) => {
		res.status(200).send({"status":"OK"});
	});

	return router;
}
export default healthcheckRouter;
