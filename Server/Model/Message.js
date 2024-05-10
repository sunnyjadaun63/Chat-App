import mongoose from "mongoose";


const messageSchema =new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiver:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },

    messages: [{
     messageType:   {
        type:String,
        enum:["sent","recieved"],
        },
       content: {
            type: String,

        },
        time: {
            type: Date,
            default: Date.now()
        },
        isRead:{
            type:Boolean,
            default:true,
        }
    },

    ]


})
const Message=  mongoose.model("messages",messageSchema)
export default Message