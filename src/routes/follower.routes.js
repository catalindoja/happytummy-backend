import {Router} from 'express'
import { getFollowers, getFollower, createFollower, updateFollower, deleteFollower } from '../controllers/follower.controller.js'


const router = Router()

/**
 * When one of the ingredients endpoints is reached, these functions trigger the corresponding function
 */
router.get('/followers', getFollowers)

router.get('/notifications/:id', getFollower)

router.post('/notifications', createFollower)

router.patch('/notifications/:id', updateFollower)

router.delete('/notifications/:id', deleteFollower)


export default router