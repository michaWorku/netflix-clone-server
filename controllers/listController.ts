import { catchAsync } from '../helpers/catchAsync'
import {  Response, NextFunction } from 'express';
import { RequestCustom } from '../@types'
import ListModel from '../models/listModel';
import AppError from '../helpers/appError'

//@desc Create List
//@route POST '/api/lists/'
//@access private
const createList = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)
    const savedList = await ListModel.create(req.body)

    res.status(200).json({
        status:'success',
        data: savedList
    })
})

//@desc Get All Lists
//@route GET '/api/lists/'
//@access private
const getAllLists = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)

    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    if (typeQuery) {
      if (genreQuery) {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await ListModel.aggregate([{ $sample: { size: 10 } }]);
    }
    
    res.status(200).json({
        status: 'success',
        data: list
    });
})

//@desc Get List
//@route GET '/api/lists/:id'
//@access private

const getList = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    const List = await ListModel.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data : List
    });
})

//@desc Update List
//@route PUT '/api/lists/:id'
//@access private
const updateList = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)

    const updatedList = await ListModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        res.status(200).json({
            status: 'success',
            data : updatedList
        });
})

//@desc Delete List
//@route DELETE '/api/lists/:id'
//@access private
const deleteList = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)
    await ListModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'success',
        message: "The List has been deleted..."
    });
})


export {
    createList,
    getAllLists,
    getList,
    updateList,
    deleteList,
}