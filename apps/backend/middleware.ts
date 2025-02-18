import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
export function authMiddleware(req:Request, res:Response, next:NextFunction){
    const authHeader=req.headers["authorization"]
    const token=authHeader?.split(" ")[1] || "";

    try{
        console.log("AuthHeader",authHeader)
        console.log(token)
        const decoded=jwt.decode(token)
        console.log(decoded)
        if(decoded?.sub){
            req.body.userId=decoded.sub as string
            next()


        }
    }
    catch(e){
        res.status(403).json({
            message: "Error while decoding"
        })
    }


}