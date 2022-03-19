import express from 'express'
import {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    getRandomMovie
} from '../controllers/movieController'
import { protect } from '../middlewares/protect'

const router = express.Router()

router.use(protect)

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