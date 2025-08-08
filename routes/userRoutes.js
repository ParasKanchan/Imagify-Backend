
import express from 'express';
import { registeredUser, logInUser, userCredits } from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js';
import userModel from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post('/register', registeredUser);
userRouter.post('/login', logInUser);
userRouter.get('/credits', userAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      credits: user.creditbalance,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
export default userRouter;
