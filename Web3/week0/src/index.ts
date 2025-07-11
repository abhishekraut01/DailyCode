import crypto from "node:crypto";

// 🔐 Create SHA-256 hash of a number
async function createHashValue(num: number): Promise<string> {
  return crypto.createHash("sha256").update(num.toString()).digest("hex");
}

// ✅ Check if hash starts with N zeros
function checkStartWithNZero(expression: string, count: number): boolean {
  return expression.startsWith("0".repeat(count));
}

// 🔍 Find the first number whose hash starts with N zeros
async function findExpressionAndValue(zeroCount: number) {
  for (let index = 0; index < 99999999; index++) {
    const hashedExpression = await createHashValue(index);

    if (checkStartWithNZero(hashedExpression, zeroCount)) {
      return { index, hashedExpression };
    }

    // Optional: log progress every 1M
    if (index % 1_000_000 === 0) {
      console.log(`🔄 Checked till: ${index}`);
    }
  }

  throw new Error("😵 No matching value found within range.");
}

// 🧠 Entry point
async function main() {
  const zeroCount = 5; // 🔧 Change number of zeros to check

  console.time("⏱️ Time Taken");
  try {
    const result = await findExpressionAndValue(zeroCount);
    console.log(
      `✅ Found! Number: ${result.index} → Hash: ${result.hashedExpression}`
    );
  } catch (err) {
    console.error("❌ Error:", err);
  }
  console.timeEnd("⏱️ Time Taken");
}

main();
