import Room from "../models/Room";
import Hotels from "../models/Hotels";
import { createError } from "../services/CustomErrorHandler";

const roomController = {
  
  // createRoom
  async create(req, res, next) {
    const hotelId = req.params.id;
    const newRoom = new Room(req.body);
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotels.findByIdAndUpdate(hotelId, {
          $push: {
            rooms: savedRoom._id,
          },
        });
      } catch (err) {
        return next(err);
      }

      res.status(201).json(savedRoom);
    } catch (err) {
      return next(err);
    }
  },

  //update
  async update(req, res, next) {
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateRoom);
    } catch (err) {
      return next(err);
    }
  },

  //delete
  async delete(req, res, next) {
    const hotelId = req.params.hid;
    try{
      await Room.findByIdAndDelete(req.params.id)
      try {
        await Hotels.findByIdAndUpdate(hotelId, {
          $pull: {
            rooms: req.params.id,
          },
        });
      } catch (err) {
        return next(err);
      }
      res.status(200).json("Room has been deleted.");
    }catch(err){
      return  next(err)
    }
    
  },

  //get room
  async getOneRoom(req, res, next) {
    try {
      const OneRoom = await Room.findById(req.params.id);
      res.status(200).json(OneRoom);
    } catch (err) {
      return next(err);
    }
  },

  // get all room
  async getAllRoom(req, res, next) {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      return next(err);
    }
  },
};

export default roomController;
