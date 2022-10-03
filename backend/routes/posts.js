const postRouter = require('express').Router();
const Post = require('../models/postsModel');


postRouter.get('/:id', async(req, res)=>{
  const post =await Post.findById(req.params.id);
  if(post){
    res.send(post)
  }else{
    res.status(404).send({message:"Post not found"});
  }
});


postRouter.post("/addpost", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });



postRouter.get('/userposts/:username' ,async(req, res) => {
    const posts = await Post.find({username:req.params.username});
    if(posts){
      res.send(posts);
    } else{
      res.status(400).send({message:'posts not found'})
    }
});


postRouter.get('/',async(req,res)=>{
        const data = await Post.find();
        res.send(data);
});


module.exports = postRouter;