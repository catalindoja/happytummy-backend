import {Router} from 'express'
import { getComments, getComment, createComment, updateComment, deleteComment } from '../controllers/comment.controller.js'


const router = Router()


/**
 * When one of the comments endpoints is reached, these functions trigger the corresponding function
 */
router.get('/comments', getComments)

router.get('/comments/:id', getComment)

router.post('/comments', createComment)

router.patch('/comments/:id', updateComment)

router.delete('/comments/:id', deleteComment)


export default router