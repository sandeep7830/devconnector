const express = require('express');
const router= express.Router();
const Profile = require('../../model/Profile');
const Post = require('../../model/Post');
const User = require('../../model/User');
const auth = require('../../middleware/auth');
const {check,validationResult}  = require('express-validator');




router.post('/',[auth,[
    check('text','enter text').not().isEmpty(),
]
],async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
        };
        

try{
    let user = await User.findById(req.user.id).select('-password');


    const post =new Post({
        text:req.body.text,
        user:req.user.id,
        name :user.name,
        avatar:user.avatar,
    })

await post.save();
res.send(post);

} catch (error) {
    console.log(error);
    res.status(400).send('error in sever');
}

});


router.get('/',auth,async(req,res)=>{
    try {
        const post = await Post.find().sort({date:-1});
        
        if (!post) {
         res.send('no post ')   
        }
     
     res.send(post);

    } catch (error) {
        console.log(error);
        res.status(400).send('server error')
    }
}

);




router.get('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
         res.send(' post not found ')   
        }
     
     res.send(post);

    } catch (error) {
        if (error.kind==='ObjectId') {
            res.send(' post not found ')   
           }
        console.log(error);
        res.status(400).send('server error')
    }
}

);


router.delete('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.send(' post not found ')   
           }


        if (post.user.toString() !== req.user.id) {
       return  res.send(' not authorize');

        }else{


     await post.remove();
        }
     
    
    res.send('post deleted');

    } catch (error) {
        if (error.kind==='ObjectId') {
            res.send('post not found')   
           }
        console.log(error);
        res.status(400).send('server error')
    }
}

);

router.put('/like/:id',auth,async(req,res)=>{


    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.send(' post not found ')   
           };
    if (post.likes.some(like=>like.user.toString() === req.user.id)) {
        return res.status(400).send('already liked');
    };


    post.likes.unshift({user:req.user.id})

    await post.save();
    res.send(post);         
    } catch (error) {
      
        console.log('error');
        res.status(400).send('server error')
    }
  
});


router.put('/unlike/:id',auth,async(req,res)=>{


    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.send(' post not found ')   
           };
    if (post.likes.filter(like=>like.user.toString() === req.user.id)) {
        const removeIndex= post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex , 1);
    }
    await post.save();
    res.send(post);         
    } catch (error) {
      
        console.log(error);
        res.status(400).send('server error')
    }
  
});


router.post('/comment/:id',[auth,[
    check('text','enter text').not().isEmpty(),
]
],async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
        };
        

try{
    let user = await User.findById(req.user.id).select('-password');
    let post= await Post.findById(req.params.id);

    const Postcomment={
        text:req.body.text,
        user:req.user.id,
        name :user.name,
        avatar:user.avatar,
    }

    post.comments.unshift(Postcomment)

await post.save();
res.send(post);

} catch (error) {
    console.log(error);
    res.status(400).send('error in sever');
}

});




router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{

    try {
      let post = await Post.findById(req.params.id);
      let comment = post.comments.find(comment=>comment.id===req.params.comment_id );


      if (!comment) {
        return res.status(400).json({errors:[{msg:'commenyt not found'}]});
      };
      if (comment.user.toString()!==req.user.id) {
        return res.status(400).json({errors:[{msg:'user not authorize'}]});
        
      }

      
    post.comments = post.comments.filter(
        comment=>comment.id!==req.params.comment_id
      );
        //const removeIndex= post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        //post.commments.splice(removeIndex , 1);
    
    await post.save();
    res.send(post);  

    } catch (error) {
        console.log(error);
        res.status(400).send('error in sever');
    
    }
})


module.exports=router;