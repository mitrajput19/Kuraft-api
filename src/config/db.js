const  mongoose = require("mongoose")

const mondbUrl = "mongodb+srv://mitsinh11:LfOsZOujrEFZxeGr@cluster0.ykslacw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = () => {
    return mongoose.connect(mondbUrl);
}

module.exports = {connectDb}