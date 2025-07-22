import { WebSocketServer } from "ws";
import prisma from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

function getRandomName() {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Daisy",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];
  // Ensure randomName is defined (should always be, but for type safety)
  return (randomName ?? "User") + Math.floor(Math.random() * 10000);
}

function getRandomEmail() {
  return `user${Math.floor(Math.random() * 100000)}@example.com`;
}

function getRandomPassword() {
  return Math.random().toString(36).slice(-8);
}

wss.on("connection", async function connection(ws) {
  // Create a new random user in the DB
  const name = getRandomName();
  const email = getRandomEmail();
  const password = getRandomPassword();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    ws.send(JSON.stringify({ message: "New user created", user }));
  } catch (error: any) {
    ws.send(
      JSON.stringify({ error: "Failed to create user", details: error.message })
    );
  }
});

console.log("WebSocket server started on ws://localhost:8080");
