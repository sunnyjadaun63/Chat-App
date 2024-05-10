import  Express  from "express";
import  Message  from "../Model/Message.js";
const router= Express.Router()
router.post("/sendMessage",async(req,res)=>{
    console.log('req: ', req);
    const {sender,receiver,message}=req.body
    if(!sender || !receiver ||!message){
        return res.status(400).json({success:false,message:"All feilds are required"})
    }
    else{
       
        console.log(' sender,receiver,message : ',  sender,receiver,message );
       
const chat = await Message.findOne({sender:sender}) 
if(!chat){
    const chat= await Message.create({
        sender:sender,
        receiver:receiver,
        messages:[
            {
                messageType:"sent",
                content:message
            }
        ]
    })


}  
else{
    await Message.findOneAndUpdate(
        { sender: sender },
        {
          $push: {
            messages: {
                messageType: "sent",
              content: message
            },
          },
        },
        {
          new: true,
        }
      );
   

} 
const recieverChat = await Message.findOne({sender:receiver}) 
if(!recieverChat){
    const recieverChat= await Message.create({
        sender:receiver,
        receiver:sender,
        messages:[
            {
                messageType:"recieved",
                content:message
            }
        ]
    })


}  
else{
    await Message.findOneAndUpdate(
        { sender: receiver },
        {
          $push: {
            messages: {
                messageType: "recieved",
              content: message
            },
          },
        },
        {
          new: true,
        }
      );
       
} 

       return res.status(200).json({sucess:true,message:"Document Updated !!"})
    }

})
export default router