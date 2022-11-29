import express from 'express'
export const router = express.Router()
import {getTodos, addTodo, modifyTodos, deleteTodos} from '../controllers/todoController.js'


router.get('/', getTodos)
router.post('/', addTodo)
router.patch('/:id', modifyTodos)
router.delete('/:id', deleteTodos)