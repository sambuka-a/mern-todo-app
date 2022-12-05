import express from 'express'
export const router = express.Router()
import {getTodos, addTodo, modifyTodos, deleteTodos, deleteMultipleTodos} from '../controllers/todoController.js'


router.get('/:q', getTodos)
router.post('/', addTodo)
router.patch('/:id', modifyTodos)
router.delete('/:id', deleteTodos)
router.delete('/', deleteMultipleTodos)
