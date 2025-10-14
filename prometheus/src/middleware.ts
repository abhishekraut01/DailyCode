import type { Request , Response , NextFunction } from "express";

export function logMiddleware(req:Request,res:Response , next:NextFunction){
    let startTime = Date.now()
    next()
    let endTime = Date.now()
    console.log(`The time took to response is ${endTime - startTime}ms on method ${req.method} on route ${req.route.path}`)
}