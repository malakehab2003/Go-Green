import express from 'express';
import * as UserController from '../controller/UserController.js';

const router = express.Router();

// all routers used are here
router.post('/createUser', UserController.createUser);
router.get('/getUser/:id', UserController.getUser);
router.delete('/deleteUser', UserController.deleteUser);
router.get('/getMe', UserController.getMe);
router.put('/updatePoints', UserController.updatePoints);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.put('/chooseSub', UserController.chooseSub);
router.put('/isPaid', UserController.isPaid);

export default router;
