// import axios from "axios"
// import userModel from "../models/userModel"
// import FormData from "form-data"


// export const generateImage = async(req,res)=>{
//     try {
//         const {userId,prompt} = req.body
//         const user = await userModel.findById(userId)

//         if(!user || !prompt){
//             return res.json({success:false, message:"Missing Details"})
//         }
//         if(user.creditbalance === 0 || userModel.creditbalance<0){
//             return res.json({success:false, message:"Low Credit Balance", creditBalance:user.creditbalance})
//         }
//         const formData = new FormData();
//         formData.append('prompt',prompt)

//         const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
//             headers: {
//                 'x-api-key': process.env.CLIPBOARD_API,
//                 },
//                 responseType:'arraybuffer'

//         })

//         const base64Image = Buffer.from(data,'binary').toString('base64')
//         const resultImage = `data:image/png;base64,${base64Image}`

//         await userModel.findByIdAndUpdate(user._id, {creditBalance:user.creditbalance-1})

//         res.json({success:true,message:'Image Generated',creditBalance:user.creditbalance-1,resultImage})
        
//     } catch (error) {
//      console.log(error)
//      res.json({success:false, message:error.message})   
//     }
// }
import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditbalance <= 0) {
      return res.json({
        success: false,
        message: "Low Credit Balance",
        creditBalance: user.creditbalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // necessary for multipart/form-data
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditbalance: user.creditbalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditbalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
