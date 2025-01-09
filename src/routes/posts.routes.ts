//importing modules
import express from "express";
import { create, getAll, get, update, deletee  } from '../controller/posts.controller'

//initiating the router
export const router = express.Router()

//add post route
router.post('/', create)

//get posts
router.get('/', getAll)

//get single post
router.get('/:id', get)

//update a post
router.put('/:id', update)

//delete a post
router.delete('/:id',   deletee)