import axios from "axios";
import React from "react";

interface BlogsProps {
  params: {
    postid: string;
  };
}

export default async function Blogs({ params }: BlogsProps) {
  const blogId = (await params).postid;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${blogId}`
  );
  const postData = response.data;
  return (
    <div>
      <h1>{postData.title}</h1>
      <p> {postData.body} </p>
    </div>
  );
}
