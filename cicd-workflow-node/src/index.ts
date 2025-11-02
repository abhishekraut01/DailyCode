import dotenv from 'dotenv'
dotenv.config()
import app from "./app";

const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`server is listening on port ${PORT}`)
})