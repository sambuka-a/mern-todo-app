import mongoose from 'mongoose'

const todoSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add todo'],
        },
        completed: {
            type: Boolean,
        }
    },
    {
        timeStamp: true,
    },
)

export default mongoose.model('Todo', todoSchema)