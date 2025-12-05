import express from 'express'

const app = express()


const PORT = process.env.PORT || "8001"
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})