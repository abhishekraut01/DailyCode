import exprss, { type Request, type Response } from 'express'
import prisma from './databases/index.js'

const app = exprss()

app.get('/api/v1/users', async (req: Request, res: Response) => {
        const response = await prisma.findUnique({
        where: {
            id: 1
        }
    });

    res.status()
})

app.get('/api/v1/users:id ', (req: Request, res: Response) => {

})


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})