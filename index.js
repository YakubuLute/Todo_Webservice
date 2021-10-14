import dotenv from "dotenv";
import express from 'express';
import  mongoose from 'mongoose';
import TodoModel from './schema/todo_schema.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

//db connection strings
const db=process.env.DB_URL;
mongoose.connect(
    db, {
        useNewUrlParser:true,
        useUnifiedTopology:true,

    }
).then(()=>{
    console.log('Database Connected');
}).catch((err)=>(console.log(err)));


app.get('/', (req, res)=>{
    console.log("Hello World")
return res.status(200).json({
    message:"Welcome to do API",
    }
    )
});


app.get('/todos', async(req, res)=>{
      const todoModel= await TodoModel.find({});
      if(todoModel){
          return res.status(200).json({
              status:true,
              message:'Todos fetched sccessfully',
              data: todoModel
          })
      }else{
          return res.status(400).json({
              status: false,
              message: 'Todos not found'
          })
      }
    } )

    app.get('/todos/:id', async(req, res)=>{
        
        const {id}=req.params;
        const todoModel=await TodoModel.findById(id);
        if(todoModel){
            return res.status(200).json({
                status:true,
                message:'Todos fetched sccessfully',
                data: todoModel
            })
        }else{
            return res.status(400).json({
                status: false,
                message: 'Todos not found'
            })
        }
    } )

    app.post('/todo', async(req, res)=>{
      const {title, description, date_time, status}= req.body;
        const todoModel=TodoModel.create({
            title,
            description, 
            date_time,
            status
    });
        if(todoModel){
            return res.status(201).json({
                status:true,
                message:"Todo created successfully",
                data:todoModel
            })
        }else{
            return res.status(400).json({
                status: false,
                message: 'Todos not found'
            })
        }

    })
    app.patch('/todos/:id', async(req, res)=>{
        const {id}=req.params;
        const {status} = req.body;
        
        const todoModel=await TodoModel.updateOne({
    status:status
        })
    } )

    app.delete('/todos/:id', (req, res)=>{
        return res.status(200).json({
            message: 'Create a todo',
        })
    } )

    app.listen(port, ()=>console.log('Application Listening on port ' + port));
