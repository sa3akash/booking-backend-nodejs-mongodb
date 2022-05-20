import Hotel from "../models/Hotels"

const hotelsControllers = {

  //create
  async create(req, res, next) {
    const newHotel = new Hotel(req.body)
    try{
      const savedHotel = await newHotel.save()
      res.status(200).json(savedHotel)
    }catch(err){
      return  next(err)
    }
  },

  //update
  async update(req, res, next) {
   
    try{
      const updateHotel =await Hotel.findByIdAndUpdate(req.params.id,{
        $set: req.body
      },{new:true})
      res.status(200).json(updateHotel)
    }catch(err){
      return  next(err)
    }
  },

  //delete
  async delete(req, res, next) {
   
    try{
      await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: 'Hotel deleted successfull'})
    }catch(err){
      return  next(err)
    }
  },

  //get hotel
  async getOneHotel(req, res, next) {
   
    try{
      const OneHotel = await Hotel.findById(req.params.id)
      res.status(200).json(OneHotel)
    }catch(err){
      return  next(err)
    }
  },

  // get all hotels
  async getAllHotel(req, res, next) {
   
    try{
      const hotels = await Hotel.find()
      res.status(200).json(hotels)
    }catch(err){
    return  next(err)
    }
  },

};



export default hotelsControllers;
