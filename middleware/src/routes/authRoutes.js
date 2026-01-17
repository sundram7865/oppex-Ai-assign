import express from 'express';
import { signupProxy, loginProxy, validateProxy } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupProxy);
router.post('/login', loginProxy);
router.patch('/validate/:id', validateProxy);

export default router;