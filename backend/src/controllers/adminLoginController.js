const Login = require('../models/adminRegisterModel');

const loginController = {}

loginController.registerUser = async function(req,res){
    try{
        let newUser = new Login({
            ...req.body
        })
        newUser.save();
        res.status(200).send({status : "Successfully uploaded", data : newUser});
    }
    catch(err){
        res.status(400).send({status : "Failed"});
    }
}

module.exports = loginController;