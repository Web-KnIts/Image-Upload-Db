const express = require('express');
const router = new express.Router();
const multer = require('multer');
const User = require('../model/userSchema');
const moment = require('moment');

const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}${file.originalname}`);
    }
});

// Filter to check if the uploaded file is an image
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"));
    }
}

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

router.post('/registration', upload.single('image'), async (req, res) => {
    const { username } = req.body;
    const image = req.file;
    console.log(username,image)
    if (!username || !image) {
        return res.status(401).json({ status: 401, message: "Please fill all the data" });
    }

    try {
        const date = moment(new Date()).format("YYYY-MM-DD");
        const userData = new User({
            username: username,
            imagePath: image.filename,
            date: date
        });
        
        const finalData = await userData.save();
        res.status(201).json({ status: 201, finalData: finalData });
    } catch (err) {
        res.status(401).json({ status: 401, message: "Error" });
    }
});


router.get('/getpost',async(req,res)=>{
    try{
        const userData = await User.find({});
        res.status(201).json({
            status:201,
            success:true,
            user:userData
        })
    }
    catch(err)
    {
        res.status(401).json({ status: 401,success:false ,message: "Error database error" });
    }
})

router.delete("/delete/:id",async(req,res)=>{

    try{
        const {id} = req.params;
        console.log(id)
        const deleteUser = await User.findOneAndDelete({imagePath:id});
        console.log(deleteUser)
        res.status(201).json({
            status:201,
            success:true,
            user:deleteUser
        })
    }catch(err)
    {
        res.status(401).json({ status: 401,success:false ,message: "Error database error" });
    }

})
// router.delete("/delete/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         const deleteUser = await User.findByIdAndDelete(id);
//         if (!deleteUser) {
//             return res.status(404).json({ status: 404, success: false, message: "User not found" });
//         }
//         console.log(deleteUser);
//         res.status(201).json({
//             status: 201,
//             success: true,
//             user: deleteUser
//         });
//     } catch (err) {
//         res.status(401).json({ status: 401, success: false, message: "Error database error" });
//     }
// });

module.exports = router;
