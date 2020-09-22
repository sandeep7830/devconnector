const express = require('express');
const router= express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const {check,validationResult}  = require('express-validator');
const axios = require('axios');
const config = require('config');

router.get('/me',auth,async (req,res)=>{
try {
    const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);

    if (!profile) {
        return res.status(400).json({errors:[{msg:'profile not exist'}]});
        
    }
    res.send(profile);
} catch (error) {
    res.status(500).send('server');
}
}
)

router.post('/',[auth, [
    check('status','enter status ').not().isEmpty(),
    check('skills','enter skills').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
        };
  

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
       youtube,
       twitter,
       instagram,
       facebook,
       linkedin
    }=req.body;
    
    
    const profileFields={};
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio)  profileFields.bio=bio;
    if(githubusername) profileFields.githubusername=githubusername;
    if(status) profileFields.status=status;
   if (skills) 
    skills: Array.isArray(skills)
    ? profileFields.skills=skills
    :  profileFields.skills= skills.split(',').map((skill) => ' ' + skill.trim()),
       
   
   
    //if(skills) profileFields.skills=skills;


   /* if (skills) {
        profileFields.skills = skills.split(',');
      }*/
    
    profileFields.social={};
    if(youtube)profileFields.social.youtube=youtube;
    if(facebook)profileFields.social.facebook=facebook;
    if(twitter)profileFields.social.twitter=twitter;
    if(linkedin)profileFields.social.linkedin=linkedin;
    if(instagram)profileFields.social.instagram=instagram;
try {
    let profile = await Profile.findOne({user:req.user.id});

if (profile) {
 const profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})    
return res.json(profile);
}
if (!profile) {
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
}
} catch (error) {
    res.status(400).send('error in  server')
}

})

router.get('/',async(req,res)=>{
try {
    const profile= await Profile.find().populate('user',['name','avatar']);
    res.send(profile);
} catch (error) {
    console.log(error);
    res.status(400).send('sever error')
} 
})


router.get('/user/:id',async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.id}).populate('user',['name','avatar']);
    
        if (!profile) {
            return res.status(400).json({errors:[{msg:'profile not exist'}]});
            
        }
        res.send(profile);
    } catch (error) {
        res.status(500).send('server');
    }
    }
    );
    
router.delete('/',auth,async(req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findByIdAndRemove({_id:req.user.id});
        res.status(200).send('user deleted')

    } catch (error) {
        console.log(error);
        res.status(400).send('sever error') 
    } 
    });




    router.put('/experience',[auth, [
        check('company','enter company ').not().isEmpty(),
        check('from','enter from date').not().isEmpty(),
        check('title','enter title').not().isEmpty()
    ]],async(req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()});
            };
        
        
        
        const{
            title,
            location,
            company,
            from,
            to,
            current,
            description
    }=req.body;

        const newExp={
            title,
            location,
            company,
            from,
            to,
            current,
            description
        };
    
    
    try {
        const profile= await Profile.findOne({user:req.user.id});
    
    
    
        profile.experience.unshift(newExp);
    await profile.save();
        res.send(profile);
    
    
    } catch (error) {
        console.log(error);
            res.status(400).send('sever error')
    }
        
        
        });




    router.delete('/experience/:exp_id',auth,async(req,res)=>{

    try {
        const profile = await Profile.findOne({user:req.user.id});


        const removeidex=profile.experience.map(index=>index.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeidex,1);

        await profile.save();
        res.send(profile);
    } catch (error) {
        res.status(400).send(error);
    }

    })    
    



    router.put('/education',[auth, [
        check('school','enter school ').not().isEmpty(),
        check('from','enter from date').not().isEmpty(),
        check('degree','enter degree').not().isEmpty(),
        check('fieldofstudy','enter fieldofstudy ').not().isEmpty()
    ]],async(req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()});
            };
        
        
        
        const{
            degree,
            fieldofstudy,
            school,
            from,
            to,
            current,
            description
    }=req.body;

        const newedu={
            degree,
            fieldofstudy,
            school,
            from,
            to,
            current,
            description
        };
    
    
    try {
        const profile= await Profile.findOne({user:req.user.id});
    
    
    
        profile.education.unshift(newedu);
    await profile.save();
        res.send(profile);
    
    
    } catch (error) {
        console.log(error);
            res.status(400).send('sever error')
    }
        
        
        });




    router.delete('/education/:edu_id',auth,async(req,res)=>{

    try {
        const profile = await Profile.findOne({user:req.user.id});


        const removeidex=profile.education.map(index=>index.id).indexOf(req.params.edu_id);
        profile.education.splice(removeidex,1);

        await profile.save();
        res.send(profile);
    } catch (error) {
        res.status(400).send(error);
    }

    }) 
       
    router.get('/github/:username', async (req, res) => {
        try {
          const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
          );
          const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
          };
      
          const gitHubResponse = await axios.get(uri, { headers });
          return res.json(gitHubResponse.data);
        } catch (err) {
          console.error(err.message);
          return res.status(404).json({ msg: 'No Github profile found' });
        }
      });



module.exports=router;

