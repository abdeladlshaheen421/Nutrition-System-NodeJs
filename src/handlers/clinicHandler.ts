import {Request,Response,NextFunction} from 'express'

export const index = (req:Request,res:Response,next:NextFunction):void => {
    res.json({msg:"index worked"})
}   

export const show = (req:Request,res:Response,next:NextFunction) => {
    res.json({msg:"show worked"})
}

export const create = (req:Request,res:Response,next:NextFunction) => {
    res.json({msg:"create worked"})
}   

export const search = (req:Request,res:Response,next:NextFunction) => {
    res.json({msg:"search worked"})
}