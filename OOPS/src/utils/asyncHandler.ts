import { Response , Request, type NextFunction } from "express";


export const asyncHandler = (fn:(req:Request , res:Response , next:NextFunction)=>Promise<void>)=>{
    
}