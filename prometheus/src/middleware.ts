import type { Request, Response, NextFunction } from "express";
import client from 'prom-client'

const reqCount = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of http request',
    labelNames: ['method', 'route', 'status_code']
})

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

export const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
});

// export function logMiddleware(req: Request, res: Response, next: NextFunction) {
//     let startTime = Date.now()
//     next()
//     let endTime = Date.now()
//     console.log(`The time took to response is ${endTime - startTime}ms on method ${req.method} on route ${req.route.path}`)
// }

export function reqCountMiddleware(req: Request, res: Response, next: NextFunction) {
    let startTime = Date.now()
    activeRequestsGauge.inc();

    res.on('finish', () => {
        let endTime = Date.now()
        console.log(`req took ${endTime - startTime}ms`)

        reqCount.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })
    })

    activeRequestsGauge.inc();
    next()
}
