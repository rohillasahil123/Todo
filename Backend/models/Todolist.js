const mongoose = require("mongoose")
 
const todoListSchema =new mongoose.Schema({
    title:{
        type : String ,
        required:true , 
        trim : true
    } ,
    description :{
        type : String ,
         required : true
    }
})

const TodoList = mongoose.model("TodoList", todoListSchema)
module.exports = TodoList;

