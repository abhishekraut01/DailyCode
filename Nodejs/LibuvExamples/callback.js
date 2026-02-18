//Q: Write a function that

// 1. Reads the contents of a file
// 2. Trims the extra space from the left and right
// 3. Writes it back to the file

import fs from 'fs'

function cleanFile(path , callback){
    fs.readFile(path , 'utf-8' , (err , data)=>{
        const clean = data.trim()
        fs.writeFile(path , clean , (err)=>{
            if(err) console.log(err)
            else callback()
        })
    }) 
}

function onDone(){
    console.log("file clean successfully")
}

cleanFile('./file.txt' , onDone)