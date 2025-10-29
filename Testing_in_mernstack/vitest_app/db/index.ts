import {PrismaClient} from "@prisma/client"

export const prismaClient = new PrismaClient()


//when someone runs the test cases he should get this 

// const prismaClient ={
//     sum:{
//         create:()=>{}
//     }
// }