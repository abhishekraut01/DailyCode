"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the todo type
interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Blogs() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get<ITodo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        ⏳ Loading todos...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 font-semibold text-center mt-10">
        ⚠️ {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todos</h1>
      <div className="space-y-4">
        {todos.slice(0, 10).map((todo) => (
          <Todo key={todo.id} title={todo.title} completed={todo.completed} />
        ))}
      </div>
    </div>
  );
}

// Reusable Todo Card
interface TodoProps {
  title: string;
  completed: boolean;
}

const Todo = ({ title, completed }: TodoProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className={`text-sm ${completed ? "text-green-600" : "text-red-500"}`}>
        {completed ? "✅ Completed" : "❌ Not Completed"}
      </p>
    </div>
  );
};
