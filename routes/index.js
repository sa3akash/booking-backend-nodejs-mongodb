import express from "express";
import {usersControllers, hotelsControllers, roomController} from "../controllers";
import {verifyToken,verifyUser,verifyAdmin} from "../services/verifyToken"



const router = express.Router();

//user
router.post("/register", usersControllers.register);
router.post("/login", usersControllers.login);
router.put("/user/:id",verifyUser, usersControllers.update);
router.delete("/user/:id",verifyUser, usersControllers.delete);
router.get("/user/:id",verifyUser, usersControllers.getOneUser);
router.get("/users",verifyAdmin, usersControllers.getAllUser);
//hotel
router.post("/hotel",verifyAdmin, hotelsControllers.create);
router.put("/hotel/:id",verifyAdmin, hotelsControllers.update);
router.delete("/hotel/:id",verifyAdmin, hotelsControllers.delete);
router.get("/hotel/:id", hotelsControllers.getOneHotel);
router.get("/hotels", hotelsControllers.getAllHotel);
//room
router.post("/room/:id",verifyAdmin, roomController.create);
router.put("/room/:id",verifyAdmin, roomController.update);
router.delete("/room/:id/:hid",verifyAdmin, roomController.delete);
router.get("/room/:id", roomController.getOneRoom);
router.get("/rooms", roomController.getAllRoom);





export default router;


