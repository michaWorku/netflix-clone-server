import express from 'express'
import {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    getRandomMovie
} from '../controllers/movieController'
const router = express.Router()

router
    .route('/:id')
    .get(getMovie)
    .put(updateMovie)
    .delete(deleteMovie)

router
    .route('/')
    .get(getAllMovies)
    .post(createMovie)

router.get('/random', getRandomMovie)


export default router