import type { Request, Response, NextFunction } from "express";
import Client from 'prom-client'

const reqCount = new Client.Counter({
    name: 'http_requests_total',
    help: 'Total number of http request',
    labelNames: ['method', 'route', 'status_code']
})

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
    let startTime = Date.now()
    next()
    let endTime = Date.now()
    console.log(`The time took to response is ${endTime - startTime}ms on method ${req.method} on route ${req.route.path}`)
}

export function reqCountMiddleware(req: Request, res: Response, next: NextFunction) {
    let startTime = Date.now()

    res.on('finish', () => {
        let endTime = Date.now()
        console.log(`req took ${endTime - startTime}ms`)

        reqCount.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })
    })

    next()
}
