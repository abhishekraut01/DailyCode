enum accountTypeEnum{
    "savings",
    "current"
}

interface bank{
    accountType:accountTypeEnum
    deposite(amount:number):void
    withdraw(amount:number):void
    getBalance():number
    getUserDetails():{
        acountHolderName:string,
        balance:
    }
}

class axisBank implements bank{
    private accountType: accountTypeEnum 
    private balance:number = 0
    private accountHolderName: string
    private accountNumber:number

    constructor(accoutType:accountTypeEnum , accountHolderName:string){
        this.accountType = accoutType
        this.accountHolderName = accountHolderName
        accountNumber
    }
    
    deposite(amount: number): void {
        this.balance += amount
    }

    withdraw(amount: number): void {
        this.balance -= amount
    }

    getBalance(): number {
        return this.balance
    }

    
}