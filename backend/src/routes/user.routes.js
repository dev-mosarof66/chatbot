import { Router } from 'express'

import { signupUser, loginUser, logoutUser, createChat, deleteChat, getChats, generateChat, generateImages, getUser } from '../controllers/user.controller.js'
import { middleware } from '../middlwares/middleware.js'
const router = Router()


router.route('/').post(signupUser)
router.route('/').get(middleware, getUser)
router.route('/login').post(loginUser)
router.route('/logout').post(middleware, logoutUser)
router.route('/create-chat').post(middleware, createChat)
router.route('/delete-chat/:id').delete(middleware, deleteChat)
router.route('/chats/:id').get(middleware, getChats)
router.route('/gemini-chat/:id').post(middleware, generateChat)
router.route('/gemini-image').get(middleware, generateImages)


export default router