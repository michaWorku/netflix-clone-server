import express from 'express'
import { protect } from '../middlewares/protect'
import {
    updateUser,
    deleteUser,
    getAllUsers,
    findUser,
    getUserStats
} from '../controllers/userController'
const router = express.Router()

router.get('/find/:id', findUser)

router.get('/stats', getUserStats)

router.use(protect)

router
    .route('/:id')
        .put(updateUser)
        .delete(deleteUser)

router.get('/', getAllUsers)




export default router