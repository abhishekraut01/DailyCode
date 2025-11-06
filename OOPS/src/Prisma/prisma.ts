import Database from "./bank_accounts.json" with { type: "json" };

type DatabaseUserType = typeof Database[number];
type OptionalUser = Partial<DatabaseUserType>;
interface Prisma {
    findUnique(args : {where: OptionalUser}): Promise<OptionalUser | null>;
}

export class PrismaClient implements Prisma {

    private simulateDelay(): Promise<void> {
        // Simulate network/database delay (10-50ms)
        const delay = Math.floor(Math.random() * 40) + 10;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    async findUnique(args : {where: OptionalUser}): Promise<OptionalUser | null> {
        await this.simulateDelay();
        const { where } = args;

        for (const elem of Database) {
            let match = true;

            for (const key in where) {
                const k = key as keyof DatabaseUserType;
                if (where[k] !== elem[k]) {
                    match = false;
                    break;
                }
            }

            if (match) return elem;
        }

        return null;
    }
    
}


