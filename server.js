import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js'; 
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const dbURL = process.env.MONGODB_URL
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
})); 


(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  } catch (error) {
    console.error('Failed to connect to DB', error);
  }
})();

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/', (req, res) => res.send("API Working!!"));
