const express = require('express');
const app = express()

app.get('/' , (req,res)=>{
    res.send("Hello world")
})

app.listen(80, () => {
  console.log("server is running on port 80");
});