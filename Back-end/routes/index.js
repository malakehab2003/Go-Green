import express from 'express';
import * as UserController from '../controller/UserController.js';

const router = express.Router();

// all routers used are here
router.post('/createUser', UserController.createUser);
router.get('/getUser/:id', UserController.getUser);
router.delete('/deleteUser', UserController.deleteUser);
router.get('/getMe', UserController.getMe);
router.put('/updatePoints', UserController.updatePoints);
router.post('/signin', UserController.signin);

export default router;
