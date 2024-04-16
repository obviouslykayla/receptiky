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

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage})

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
const fetchUser= async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:'Nejste přihlášeni.'});
    }
    else{
        try {
            const data = jwt.verify(token,'secret_recipe');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:'Autorizační token není validní.'});
        }
    }
}
app.post('/signup', async (req, res) => {
    try {
        if (!req.body.username) {
            return res.status(400).json({ success: false, errors: 'Uživatelské jméno je povinné' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ success: false, errors: 'Neplatný formát emailu' });
        }
        if (req.body.password.length < 8) {
            return res.status(400).json({ success: false, errors: 'Heslo musí mít aspoň 8 znaků' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Uživatel již existuje" });
        }
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            saveLater: req.body.saveLater
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'secret_recipe');
        res.json({ success: true, token });
    } catch (error) {
        console.error('Chyba při vytváření uživatele:', error);
        res.status(500).json({ success: false, errors: 'Nastala chyba při vytváření uživatele' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.json({ success: false, errors: "Uživatel neexistuje" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const tokenData = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(tokenData, 'secret_recipe');

            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Špatné heslo" });
        }
    } catch (error) {
        console.error('Chyba při přihlašování:', error);
        res.status(500).json({ success: false, errors: 'Nastala chyba při přihlašování' });
    }
});
app.put('/edituser', fetchUser, async (req, res) => {
try {
    const userId = req.user.id;
    const { newPassword } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
    return res.status(404).json({ success: false, error: 'Uživatel nebyl nalezen' });
    }
    if (newPassword && newPassword.length < 8) {
    return res.status(400).json({ success: false, errors: 'Nové heslo musí mít alespoň 8 znaků' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ success: true });
} catch (error) {
    console.error('Chyba při editaci hesla:', error);
    res.status(500).json({ success: false, errors: 'Nastala chyba při změně hesla' });
}
});

app.post('/addrecipe',fetchUser, async (req,res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Uživatel není oprávněn' });
        }
        const userId = req.user.id;
        const lastRecipe = await Recipe.findOne().sort({ id: -1 });
        let lastRecipeId = 0;
        if (lastRecipe) {
            lastRecipeId = lastRecipe.id;
        }
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
        await recipe.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Chyba při přidání receptu:', error);
        res.status(500).json({ success: false, error: 'Recept se nepodařilo přidat' });
    }
});

app.get('/recipe/:recipeId', async (req, res) => {
const recipeId = req.params.recipeId;
try {
    const recipe = await Recipe.findOne({ id: recipeId });
    if (!recipe) {
    return res.status(404).json({ error: 'Recept nebyl nalezen' });
    }
    res.json(recipe);
} catch (error) {
    console.error('Chyba při načítání receptu:', error);
    res.status(500).json({ error: 'Recept se nepodařilo načíst' });
}
});

app.get('/listrecipes', fetchUser, async (req, res) => {
try {
    if (!req.user) {
    return res.status(401).json({ success: false, error: 'Uživatel není oprávněn' });
    }
    const userId = req.user.id;
    const recipes = await Recipe.find({ userId: userId });
    res.json(recipes);
} catch (error) {
    console.error('Chyba při načítání receptů:', error);
    res.status(500).json({ error: 'Recepty se nepodařilo načíst' });
}
});

app.put('/editrecipe/:recipeId',fetchUser, async (req, res) => {
try {
    if (!req.user) {
        return res.status(401).json({ success: false, error: 'Uživatel není oprávněn' });
        }
    const recipeId = parseInt(req.params.recipeId);
    const userId = req.user.id;
    const recipe = await Recipe.findOne({ id: recipeId, userId: userId});
    if (!recipe) {
    return res.status(404).json({ error: 'Recept nebyl nalezen' });
    }
    const updatedRecipeData = req.body;
    const updatedRecipe = await Recipe.findOneAndUpdate({ id: recipeId, userId: userId },
         updatedRecipeData, { new: true });
    if (updatedRecipe) {
    res.json({ success: true, message: 'Recept byl úspěšně změněn', updatedRecipe });
    } else {
    res.status(404).json({ success: false, message: 'Recept nebyl nalezen' });
    }
} catch (error) {
    console.error('Chyba při editaci receptu:', error);
    res.status(500).json({ success: false, message: 'Interní chyba serveru' });
}
});

app.get('/allrecipes', async (req,res) => {
    let recipes= await Recipe.find({});
    res.send(recipes);
})
app.post('/removerecipe',async (req,res)=>{
    await Recipe.findOneAndDelete({id:req.body.id});
    res.json({
        success:true,
        name:req.body.name,
    })
})
app.post('/savelater',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.saveLater[req.body.recipeId]=1;
    await Users.findOneAndUpdate({_id:req.user.id},{saveLater:userData.saveLater});
    res.send("added");
})

app.post('/removefromsave', fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.saveLater[req.body.recipeId]=0;
    await Users.findOneAndUpdate({_id:req.user.id},{saveLater:userData.saveLater});
    res.send("removed");
})

app.get('/getsaveforlater', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.saveLater);
});

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on "+port);
    }
    else{
        console.log("server not running because of error "+error);
    }
});