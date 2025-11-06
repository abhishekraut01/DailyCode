const Database = [
    {
        id: 1,
        name: "Abhishek Raut",
        email: "abhisheraut@gmail.com",
        age: 21,
        city: "Nagpur",
        isVerified: true,
        accountType: "premium",
        createdAt: "2024-10-05T12:30:00Z",
    },
    {
        id: 2,
        name: "Aarav Mehta",
        email: "aarav.mehta@example.com",
        age: 23,
        city: "Pune",
        isVerified: false,
        accountType: "free",
        createdAt: "2024-11-01T09:45:00Z",
    },
    {
        id: 3,
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        age: 22,
        city: "Delhi",
        isVerified: true,
        accountType: "premium",
        createdAt: "2024-10-20T15:10:00Z",
    },
    {
        id: 4,
        name: "Rohan Verma",
        email: "rohan.verma@example.com",
        age: 25,
        city: "Mumbai",
        isVerified: true,
        accountType: "free",
        createdAt: "2024-09-15T18:25:00Z",
    },
    {
        id: 5,
        name: "Sneha Iyer",
        email: "sneha.iyer@example.com",
        age: 24,
        city: "Bangalore",
        isVerified: false,
        accountType: "premium",
        createdAt: "2024-11-03T08:55:00Z",
    },
];

type databseUserType = typeof Database[0]
type OptionalUser = Partial<databseUserType>;
interface Prisma {
    findUnique(where: OptionalUser): OptionalUser | undefined;
    findMany(where: OptionalUser): OptionalUser[]
}

export class PrismaClient implements Prisma {
    findUnique(where: OptionalUser): OptionalUser | undefined {
        for (const elem of Database) {
            let match = true;

            // Loop over all keys provided in `where`
            for (const key in where) {
                if (where[key as keyof OptionalUser] !== elem[key as keyof DatabaseUserType]) {
                    match = false;
                    break;
                }
            }

            if (match) return elem; // return first match like Prisma's findUnique
        }

        return undefined; // if no match found
    }
    findMany(where: OptionalUser): OptionalUser[] {
        return Database.filter(elem =>
            Object.entries(where).every(([key, value]) => elem[key as keyof DatabaseUserType] === value)
        );
    }

}
