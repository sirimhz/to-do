

const express = require('express')
const cors = require('cors')
const Task = require('../frontend/schema/taskschema')
const mongoose = require('mongoose')
require('dotenv').config
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT;

mongoose.connect('mongodb+srv://siri:siri@cluster0.hztdmwa.mongodb.net/list?retryWrites=true&w=majority')


app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});
app.get('/tasks',async(req,res)=>{
    const find = await Task.find()
    res.json(find)
})

app.post('/createtask',(req,res)=>{
    const task = new Task({
        taskName: req.body.taskName
    })
    task.save(task).then(async()=>{
        const find = await Task.findOne(task)
        res.json(find)
    })


    }
)

app.put('/edit/:id',async(req,res)=>{
    const id = req.params.id
    const newTask = {
        taskName: req.body.taskName
    }
    const edit = await Task.findByIdAndUpdate(id,newTask)
    if(edit){
        res.send('edit')
    }

    
})
app.delete('/delete/:id',async(req,res)=>{
   await Task.findByIdAndDelete(req.params.id).then(()=>{
        res.json({msg:'task delted'})
    })
})











app.listen(port || 4000, ()=>{console.log(`running on port ${port}`)})