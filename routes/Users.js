const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

//Update
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password === User.password){
            try{
               const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
               },
               {new: true}
               )
               res.status(200).json(updatedUser)
            }
            catch (err){
                res.status(500).json(err)
            } 
        }
        res.status(401).json("Wrong password")
    }
    res.status(401).json("Only permitted to update your account")
})

//Delete
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
               await Post.deleteMany({username: user.username})
               await User.findByIdAndDelete(req.params.id)
               res.status(200).json("User has been deleted")
            }
            catch (err){
                res.status(500).json(err)
            } 
        }
        catch (err) {
            res.status(401).json("User not exist")
        }
    } else {
    res.status(401).json("Only permitted to delete your account")
    }
})

//Get
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;