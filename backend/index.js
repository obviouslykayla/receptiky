const port = 4000;
const {v4: uuidv4} = require('uuid');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path= require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

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
    userId:{type:String,required:true,},
    id:{type:Number,required: true,},
    name:{type:String,required:true,},
    image:{type:String,required:true,},
    category:{type:String,required:true,},
    date:{type:Date,default:Date.now,},
    servings:{type:Number,required:true,},
    preparation_time:{type:Object,required:true,},
    preparation_process:{type:Object,required:true,},
    ingredients:{type:Object,required:true,},
    source:{type:String,required:true}
})
const Users= mongoose.model('Users',{
    username:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    saveLater:{type: Object,default:{},},
    date:{type:Date,default: Date.now(),}
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

app.post('/signup', async (req, res) => {
    try {
        // Check if the username is provided in the request body
        if (!req.body.username) {
            return res.status(400).json({ success: false, errors: 'Username is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ success: false, errors: 'Invalid email format' });
        }

        // Validate password length
        if (req.body.password.length < 8) {
            return res.status(400).json({ success: false, errors: 'Password must be at least 8 characters long' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Check if the email already exists
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User already exists" });
        }

        // Create a new user with the hashed password
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            saveLater: req.body.saveLater
        });

        // Save the user to the database
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }

        // Generate JWT token
        const token = jwt.sign(data, 'secret_recipe');
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, errors: 'An error occurred while signing up user' });
    }
});


//user log in endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });

        if (!user) {
            return res.json({ success: false, errors: "User doesn't exist" });
        }

        // Compare hashed password with plaintext password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const tokenData = {
                user: {
                    id: user.id
                }
            };

            // Generate JWT token
            const token = jwt.sign(tokenData, 'secret_recipe');

            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong password" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, errors: 'An error occurred while logging in' });
    }
});

// edit user endpoint
app.put('/edituser', fetchUser, async (req, res) => {
try {
    const userId = req.user.id;
    const { newPassword } = req.body;

    // Find the user by ID
    const user = await Users.findById(userId);

    if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Validate new password length
    if (newPassword && newPassword.length < 8) {
    return res.status(400).json({ success: false, errors: 'New password must be at least 8 characters long' });
    }

    // Hash the new password if provided
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;

    // Save the updated user information
    await user.save();

    res.json({ success: true });
} catch (error) {
    console.error('Error editing user:', error);
    res.status(500).json({ success: false, errors: 'An error occurred while updating password' });
}
});

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

app.put('/editrecipe/:recipeId',fetchUser, async (req, res) => {
try {
    if (!req.user) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
    const recipeId = parseInt(req.params.recipeId);
    const userId = req.user.id;
    const recipe = await Recipe.findOne({ id: recipeId, userId: userId});

    if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
    }

    const updatedRecipeData = req.body;
    const updatedRecipe = await Recipe.findOneAndUpdate({ id: recipeId, userId: userId }, updatedRecipeData, { new: true });

    if (updatedRecipe) {
    res.json({ success: true, message: 'Recipe updated successfully', updatedRecipe });
    } else {
    res.status(404).json({ success: false, message: 'Recipe not found' });
    }
} catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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