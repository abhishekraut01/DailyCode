import express, { Request, Response } from 'express';
import  prisma  from "@repo/db/client";
const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());

// Create user
app.post('/users', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get user by id
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update user
app.put('/users/:id', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: email !== undefined ? email : user.email,
        password: password !== undefined ? password : user.password,
        name: name !== undefined ? name : user.name,
      },
    });
    res.json(updatedUser);
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
