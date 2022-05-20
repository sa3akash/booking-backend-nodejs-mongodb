import User from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {TOKEN_SECTET} from "../config"
import {createError} from "../services/CustomErrorHandler"

const registerController = {
  // register
  async register(req, res, next) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(201).json({ msg: "User has been Created" });
    } catch (err) {
      next(err);
    }
  },

  // login
  async login(req, res, next) {
    try {
     const user = await User.findOne({username: req.body.username})
     if(!user){
      return next(createError(400,'User Not Found'))
     }
    const originalPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!originalPassword){
     return next(createError(400,"Password Not Match"))
    }
    const token = jwt.sign({id: user._id,isAdmin: user.isAdmin},TOKEN_SECTET)

    const {password, isAdmin, ...others}= user._doc;

      res.cookie('access_token',token,{
        httpOnly: true,
      }).status(201).json({...others});
      
    } catch (err) {
    return  next(err);
    }
  },

    //update
    async update(req, res, next) {
   
      try{
        const updateUser =await User.findByIdAndUpdate(req.params.id,{
          $set: req.body
        },{new:true}).select("-password")
        res.status(200).json(updateUser)
      }catch(err){
        return  next(err)
      }
    },
  
    //delete
    async delete(req, res, next) {
     
      try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'User deleted successfull'})
      }catch(err){
        return  next(err)
      }
    },
  
    //get one User
    async getOneUser(req, res, next) {
     
      try{
        const OneUser = await User.findById(req.params.id).select("-password")
        res.status(200).json(OneUser)
      }catch(err){
        return  next(err)
      }
    },
  
    // get all hotels
    async getAllUser(req, res, next) {
     
      try{
        const Users = await User.find().select("-password")
        res.status(200).json(Users)
      }catch(err){
      return  next(err)
      }
    },
  
};

export default registerController;
