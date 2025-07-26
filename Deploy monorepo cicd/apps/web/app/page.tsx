import  prisma  from "@repo/db/client";

export default async function Home() {
  const res = await prisma.user.findMany();

  return (
    <div>
      {res.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
