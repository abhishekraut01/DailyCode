import crypto from "node:crypto";
async function createHashValue(num) {
    return crypto.createHash("sha256").update(num.toString()).digest("hex");
}
// we have to find the number by which hex string from is starting with 00000
function checkStartWithfiveZeroOrNot(expression) {
    for (let i = 0; i < 5; i++) {
        if (expression.charAt(i) === "0") {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}
async function findExpressionAndValue() {
    for (let index = 0; index < 99999999; index++) {
        const hasedExpression = await createHashValue(index);
        const isStartWithZeroRes = checkStartWithfiveZeroOrNot(hasedExpression);
        if (isStartWithZeroRes) {
            return {
                hasedExpression,
                index,
            };
        }
    }
}
function main() {
    const res = findExpressionAndValue();
    res.then((result) => {
        console.log(`The value form which the string start with 5 zeros is ${result?.index} : ${result?.hasedExpression}`);
    })
        .catch((err) => {
        console.log("logic galat ho gaya ji", err);
    });
}
main();
