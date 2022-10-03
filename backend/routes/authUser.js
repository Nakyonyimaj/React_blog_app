const userRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');



userRouter.post(
    "/signup",
    expressAsyncHandler(async (req,res)=>{
      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
  );

  userRouter.post(
    "/signin",
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,

          });
          return;
        }
      }
      res.status(401).send({ message: "Invalid email or password" });
    })
  );


  userRouter.put("/:id", expressAsyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        req.body.password =  bcrypt.hashSync(req.body.password);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  }));


module.exports = userRouter

