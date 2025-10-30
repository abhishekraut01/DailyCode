import { app } from "./app.js";

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} `)
})