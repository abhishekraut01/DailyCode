import os from "os";
import cluster from "cluster";

const numCPUs = os.cpus().length;
const number = 10000000000; 

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    console.log(`Using ${numCPUs} CPUs`);
    
    const startTime = Date.now();
    let results = [];
    let completedWorkers = 0;
    
    // Create workers
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork({ WORKER_ID: i });
        
        worker.on('message', (msg) => {
            results.push(msg.sum);
            completedWorkers++;
            
            console.log(`Worker ${i} completed with sum: ${msg.sum}`);
            
            if (completedWorkers === numCPUs) {
                const totalSum = results.reduce((acc, sum) => acc + sum, 0);
                const endTime = Date.now();
                
                console.log('\n=== FINAL RESULTS ===');
                console.log(`Total Sum: ${totalSum}`);
                console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`);
                
                process.exit(0);
            }
        });
    }
    
} else {
    // Worker process
    const workerId = parseInt(process.env.WORKER_ID);
    const chunkSize = Math.floor(number / numCPUs);
    const start = workerId * chunkSize;
    const end = (workerId === numCPUs - 1) ? number : start + chunkSize;
    
    console.log(`Worker ${process.pid} (ID: ${workerId}) calculating from ${start} to ${end}`);
    
    let sum = 0;
    for (let i = start; i < end; i++) {
        sum += i;
    }
    
    process.send({ sum });
    process.exit(0);
}
