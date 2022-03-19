import { catchAsync } from '../helpers/catchAsync'
import {  Response, NextFunction } from 'express';
import { RequestCustom } from '../@types'
import UserModel from '../models/userModel';
import AppError from '../helpers/appError'
import CryptoJS from 'crypto-js'
import config from 'config'

const updateUser = catchAsync(async ( req: RequestCustom, res: Response, _next: NextFunction)=>{

    if(req.user.id !== req.params.id || req.user.isAdmin)
        throw new AppError("You can update only your account!", 403)  
    
    if(req.body.password){
        const jwtSecret = config.get('JWT_SECRET') as string
        req.body.password = CryptoJS.AES.encrypt(req.body.password, jwtSecret).toString()

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
        
        res.status(200).json({
            status: 'success',
            data: { updatedUser },
          });
    }
})

const deleteUser = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(req.user.id !== req.params.id || req.user.isAdmin)
        throw new AppError("You can delete only your account!", 403)  
    
    const document = await UserModel.findByIdAndDelete(req.params.id);

    if (!document) throw new AppError(`ID (${req.params.id}) not found!`, 404);

    res.status(204).json({
        status: 'success',
        data: null,
      });
})

const getAllUsers = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    const query = req.query.new;
    if(!req.user.isAdmin){
        throw new AppError("You are not allowed to see all users!", 403)
    }

    const users = query
        ? await UserModel.find().sort({ _id: -1 }).limit(5)
        : await UserModel.find();
      res.status(200).json({status: 'success', data: users});
})

const findUser = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    const user = await UserModel.findById(req.params.id)

    res.status(200).json({status: 'success', data: user});

})

const getUserStats = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);

    const data = await UserModel.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({
          status: 'success', data
      })
})

export {
    updateUser,
    deleteUser,
    getAllUsers,
    findUser,
    getUserStats
}
