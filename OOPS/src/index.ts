import exprss, { type Request, type Response } from 'express'
import prisma from './databases/index.js'
import { asyncHandler } from './utils/asyncHandler.js'

const app = exprss()

app.get('/api/v1/users/:id', asyncHandler(async (req: Request, res: Response) => {
    const response = await prisma.findUnique({
        where: {
            id: 1
        }
    });

    res.status(200).json({
        message:"data fetched successfully",
        data:response
    })
}))


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})