const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const postRouter = require('./routes/posts.js');
const userRouter = require('./routes/authUser.js');




dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

mongoose
.connect(process.env.MONGODB_URI)
.then(console.log('connected to mongodb'))
.catch((err) =>{
    console.log(err.message)
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });


app.use('/api/posts' , postRouter);
app.use('/api/users',userRouter);


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`connect to server at http://localhost:${port}`);
});