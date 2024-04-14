const port = 4000;
const {v4: uuidv4} = require('uuid');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path= require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://kayla:obvsYAPPERkayla727627@kayla.em7jmoi.mongodb.net/kayla");

app.get("/",(req,res)=>{
    res.send("Express app is running");
})

//image storage
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage})

//upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('recipe'), (req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Recipe=mongoose.model("Recipe",{
    userId:{
        type:String,
        required:true,
    },
    id:{
        type:Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    servings:{
        type:Number,
        required:true,
    },
    preparation_time:{
        type:Object,
        required:true,
    },
    preparation_process:{
        type:Object,
        required:true,
    },
    ingredients:{
        type:Object,
        required:true,
    },
    source:{
        type:String,
        required:true
    }
})
const Users= mongoose.model('Users',{
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    saveLater:{
        type: Object,
        default:{},
    },
    date:{
        type:Date,
        default: Date.now(),
    }
})
//middleware to fetch user
const fetchUser= async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:'You are not logged in'});
    }
    else{
        try {
            const data = jwt.verify(token,'secret_recipe');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:'Token is not valid'});
        }
    }
}
//user registration endpoint
app.post('/signup', async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"user already exists"});
    }
    const user = new Users({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        saveLater: req.body.saveLater
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_recipe');
    res.json({success:true, token})
})

//user log in endpoint
app.post('/login', async (req,res)=>{
    let user = await  Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data= {
                user:{
                    id:user.id
                }
            }
            const  token = jwt.sign(data,"secret_recipe");
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"wrong password"});
        }
    }
    else{
        res.json({success:false, errors:"user doesnt exist"});
    }
})
app.post('/addrecipe',fetchUser, async (req,res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        // Get the user ID from the decoded token
        const userId = req.user.id;
        const lastRecipe = await Recipe.findOne().sort({ id: -1 });
        let lastRecipeId = 0;
        if (lastRecipe) {
            lastRecipeId = lastRecipe.id;
        }


        // Create the recipe with the userId
        const recipe = new Recipe({
            userId: userId,
            id: lastRecipeId + 1,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            servings: req.body.servings,
            preparation_time: req.body.preparation_time,
            preparation_process: req.body.preparation_process,
            ingredients: req.body.ingredients,
            source: req.body.source,
        });

        // Save the recipe
        await recipe.save();

        // Respond with success message
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ success: false, error: 'Failed to add recipe' });
    }
});

app.get('/recipe/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
      const recipe = await Recipe.findOne({ id: recipeId });
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  });

  app.get('/listrecipes', fetchUser, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      // Get the user ID from the decoded token
      const userId = req.user.id;
  
      // Assuming Recipe model has a userId field
      const recipes = await Recipe.find({ userId: userId });
  
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  });
//api for getting all products
app.get('/allrecipes', async (req,res) => {
    let recipes= await Recipe.find({});
    res.send(recipes);
})
//deleting products
app.post('/removerecipe',async (req,res)=>{
    await Recipe.findOneAndDelete({id:req.body.id});
    res.json({
        success:true,
        name:req.body.name,
    })
})

//save for later
app.post('/savelater',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.saveLater[req.body.recipeId]=1;
    await Users.findOneAndUpdate({_id:req.user.id},{saveLater:userData.saveLater});
    res.send("added");
})

//remove from save for later
app.post('/removefromsave', fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.saveLater[req.body.recipeId]=0;
    await Users.findOneAndUpdate({_id:req.user.id},{saveLater:userData.saveLater});
    res.send("removed");
})

//get save for later
app.post('/getsaveforlater',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.saveLater);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on "+port);
    }
    else{
        console.log("server not running because of error "+error);
    }
});