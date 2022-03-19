import { catchAsync } from '../helpers/catchAsync'
import {  Response, NextFunction } from 'express';
import { RequestCustom } from '../@types'
import MovieModel from '../models/movieModel';
import AppError from '../helpers/appError'

const createMovie = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)
    const savedMovie = await MovieModel.create(req.body)

    res.status(200).json({
        status: 'success',
        data : savedMovie
    })
})

const getAllMovies = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)

    const movies = await MovieModel.find();
    
    res.status(200).json({
        status: 'success',
        data: movies.reverse()
    });
})

const getMovie = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    const movie = await MovieModel.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data : movie
    });
})

const updateMovie = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)

    const updatedMovie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        res.status(200).json({
            status: 'success',
            data : updatedMovie
        });
})

const deleteMovie = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    if(!req.user.isAdmin)
        throw new AppError('You are not allowed', 403)
    await MovieModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'success',
        message: "The movie has been deleted..."
    });
})

const getRandomMovie = catchAsync(async ( req: RequestCustom, res: Response, next: NextFunction)=>{
    const type = req.query.type;
    let movie;
  
    if (type === "series") {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json({
        status: 'success',
        data : movie
    });
})


export {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    getRandomMovie
}