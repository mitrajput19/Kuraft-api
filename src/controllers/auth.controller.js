const userService = require("../services/user.service")
const jwtProvider = require("../config/jwtProvider")
const bcrypt = require("bcryptjs")
const cartService = require("../services/cart.service")


const register = async (request, response) =>{
    try{
        const user = await userService.createUser(request.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return response.status(200).send({jwt,message:"registered Successfully"})
    }catch (error) {
        return response.status(500).send({error:error.message});
      }

}

const login = async (request, response) =>{
    const {password,email} = request.body; 
    try{
        const user = await userService.getUserByEmail(email);
        if(!user){
            return response.status(404).send({message:"user not found with email",email})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return response.status(401).send({message:"Invalid password"})
        }
        const jwt = jwtProvider.generateToken(user._id);
        return response.status(200).send({jwt,message:"login Successfully"})

    }catch (error) {
        return response.status(500).send({error:error.message});
      }

}

module.exports = {register,login}