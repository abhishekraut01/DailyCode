export function sum(a: number, b: number) {
    return a + b
}


export function multiply(a: number, b: number) {
    return a * b
}


export function substract(a: number, b: number) {
    return a - b
}


export function devide(a: number, b: number) {
    if (b === 0) throw Error("cant devide by zero")
    return a / b
}
