import axios from "axios";
import React, { useEffect, useState } from "react";

interface Idata{
    title:string,
    body:string
}

const Blogs = () => {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        setData(response.data);
        setIsloading(false);
      });
  });

  if (isLoading) {
    return <div>loading .........</div>;
  }
  return (
    <div>
        {data.title}
        {data.body}
    </div>
  )
};

export default Blogs;
