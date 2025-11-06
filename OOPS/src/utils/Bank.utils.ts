export enum AccountTypeEnum {
  SAVINGS = "savings",
  CURRENT = "current"
}

interface Bank {
  accountType: AccountTypeEnum;
  deposit(amount: number): void;
  withdraw(amount: number): void;
  getBalance(): number;
  getUserDetails(): {
    accountHolderName: string;
    balance: number;
    accountNumber: number;
  };
}


export class AxisBank implements Bank {
  public accountType: AccountTypeEnum;
  private balance: number = 0;
  private accountHolderName: string;
  private accountNumber: number;

  constructor(accountType: AccountTypeEnum, accountHolderName: string) {
    this.accountType = accountType;
    this.accountHolderName = accountHolderName;
    this.accountNumber = Math.floor(Math.random() * 1_000_000);
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Insufficient funds!");
    }
    this.balance -= amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getUserDetails() {
    return {
      accountNumber: this.accountNumber,
      accountHolderName: this.accountHolderName,
      balance: this.balance
    };
  }
}



