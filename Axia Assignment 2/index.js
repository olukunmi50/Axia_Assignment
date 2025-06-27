const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');



const userRoutes = require('./Routes/User.Routes');
const kycRoutes = require('./Routes/Kyc.Routes');
const postRoutes = require('./Routes/Post.Routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB connection error:', err));

app.use('/api/users',userRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
