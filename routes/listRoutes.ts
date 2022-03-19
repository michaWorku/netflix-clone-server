import express from 'express'
import  {
    createList,
    getAllLists,
    getList,
    updateList,
    deleteList,
} from '../controllers/listController'
import { protect } from '../middlewares/protect'

const router = express.Router()

router.use(protect)

router
    .route('/:id')
    .get(getList)
    .put(updateList)
    .delete(deleteList)

router
    .route('/')
    .get(getAllLists)
    .post(createList)


export default router