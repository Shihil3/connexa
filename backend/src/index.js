require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require("./routes/commentRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/comments", commentRoutes);

connectDB(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT || 4000, () => console.log('Server running')))
  .catch(console.error);
