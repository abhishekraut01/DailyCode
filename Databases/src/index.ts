import express from 'express'

const app = express()





app.post('/login', (req, res) => {
    res.status(200).json({
        success: true,
        message: "user created successfully",
        data: {
            
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is walking on port ${process.env.PORT}`)
})