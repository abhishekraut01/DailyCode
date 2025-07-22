import  prisma  from "@repo/db/client";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))} 
    </div>
  );
}
