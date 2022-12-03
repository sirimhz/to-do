const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    taskName: String
})

const Task = mongoose.model('todo',taskSchema)

module.exports = Task;

