import { AccountTypeEnum, AxisBank } from "./interfaces/interfaces.js";

const newUser = new AxisBank(AccountTypeEnum.CURRENT, "Abhishek");

newUser.deposit(5000);
newUser.withdraw(2000);

console.log(newUser.getUserDetails());
console.log("Current Balance:", newUser.getBalance());
console.log("user details:", newUser.getUserDetails());