// import jwt from 'jsonwebtoken'

// const userAuth = async(req,res,next)=>{
//     const {token} = req.headers;

//     if(!token){
//         return res.json({success:false,message:"Not Authorized! Login Again..."})
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//         if(tokenDecode.id){
//             req.userId=tokenDecode.id;
//             req.body.userId=tokenDecode.id;
//         }else{
//             return res.json({success:false,message:"Not Authorized! Login Again..."})
//         }
//         next();
//     } catch (error) {
//         res.json({success:false,message:error.message});
//     }
// }

// export default userAuth
// import jwt from 'jsonwebtoken';

// const userAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided. Not authorized!",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded?.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token. Authorization failed.",
//       });
//     }

//     req.userId = decoded.id;
//     req.body.userId = decoded.id; // ✅ TEMPORARY: For compatibility with existing controllers

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Authorization failed. " + error.message,
//     });
//   }
// };

// export default userAuth;
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized. Login again.",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      res.json({ success: false, message: "Not authorized. Login again." });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;