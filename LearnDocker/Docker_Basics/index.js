import express from 'express'
const PORT = 3000
const app = express()

app.get('/' , (req,res)=>{
    res.status(200).json({
        message:"hello sir" , 
        success:true
    })
})

app.listen(PORT , (req,res)=>{
    console.log(`server is listening at port ${PORT}`)
})