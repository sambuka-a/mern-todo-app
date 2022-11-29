import asyncHandler from 'express-async-handler';
import Todo from '../models/todoModel.js';

//route /todos
export const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json(todos)
})

//route /todos
export const addTodo = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const todo = await Todo.create({
        text: req.body.text,
        completed: req.body.completed,
    })

    res.status(200).json(todo)
})

//route /todos/id
export const modifyTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTodo)
})

//route /todos/id
export const deleteTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.find({_id: {$in: req.params.id}})
    console.log(req.params.id);
    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    await Todo.deleteMany({_id: {$in: req.params.id}});
    res.status(200).json({id: req.params.id})
})

/*
export const deleteTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    await todo.remove();
    res.status(200).json({id: req.params.id})
})
*/