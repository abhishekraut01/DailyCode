export enum AccountTypeEnum {
  SAVINGS = "savings",
  CURRENT = "current",
}

export interface Bank {
  id: number;
  accountNumber: number;
  accountHolderName: string;
  email: string;
  branchName: string;
  ifscCode: string;
  accountType: AccountTypeEnum;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  deposit(amount: number): void;
  withdraw(amount: number): void;
  getBalance(): number;
  getUserDetails(): {
    id: number;
    accountNumber: number;
    accountHolderName: string;
    email: string;
    accountType: AccountTypeEnum;
    balance: number;
    branchName: string;
    ifscCode: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export class AxisBank implements Bank {
  public id: number;
  public accountNumber: number;
  public accountHolderName: string;
  public email: string;
  public branchName: string;
  public ifscCode: string;
  public accountType: AccountTypeEnum;
  public isActive: boolean;
  private balance: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    accountNumber,
    accountHolderName,
    email,
    accountType,
    branchName,
    ifscCode,
    balance,
    isActive,
    createdAt,
    updatedAt,
  }: {
    id: number;
    accountNumber: number;
    accountHolderName: string;
    email: string;
    accountType: AccountTypeEnum;
    branchName: string;
    ifscCode: string;
    balance: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }) {
    this.id = id;
    this.accountNumber = accountNumber;
    this.accountHolderName = accountHolderName;
    this.email = email;
    this.accountType = accountType;
    this.branchName = branchName;
    this.ifscCode = ifscCode;
    this.balance = balance;
    this.isActive = isActive;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  public deposit(amount: number): void {
    if (!this.isActive) throw new Error("Account is inactive.");
    this.balance += amount;
    this.updatedAt = new Date();
  }

  public withdraw(amount: number): void {
    if (!this.isActive) throw new Error("Account is inactive.");
    if (amount > this.balance) throw new Error("Insufficient funds!");
    this.balance -= amount;
    this.updatedAt = new Date();
  }

  public getBalance(): number {
    return this.balance;
  }

  public getUserDetails() {
    return {
      id: this.id,
      accountNumber: this.accountNumber,
      accountHolderName: this.accountHolderName,
      email: this.email,
      accountType: this.accountType,
      balance: this.balance,
      branchName: this.branchName,
      ifscCode: this.ifscCode,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
