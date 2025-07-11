import { createClient } from "redis";
const client = createClient();

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await client.connect();

  console.log("🚀 Worker connected to Redis, waiting for jobs...");

  while (true) {
    const response = await client.brPop("submission", 0);

    if (response) {
      const task = JSON.parse(response.element);

      console.log("🧾 Job received:", task);

      // Simulate code execution
      await sleep(1000);

      console.log("✅ Job executed successfully");
    }
  }
}

main();
