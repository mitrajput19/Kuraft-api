const userService = require("../services/user.service")
const jwtProvider = require("../config/jwtProvider")
const bcrypt = require("bcrypt")
const cartService = require("../services/cart.service")


const getUserProfile = async (request, response) =>{
    try{
        const jwt = request.headers.authorization?.split(" ")[1];
        if(!jwt){
            return response.status(404).send({message:"unauthenticated"});
        }
        const user= await userService.getUserProfileByToken(jwt);
        return response.status(200).send({user})
    }catch (error) {
        return response.status(500).send({error:error.message});
      }

}

const getAllUser = async (request, response) =>{
    try{
        const users = await userService.getAllUsers();
        
        return response.status(200).send({users})
    }catch (error) {
        return response.status(500).send({error:error.message});
      }

}

module.exports = {getUserProfile,getAllUser}