import axios from "axios";

export default async function Blogs() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const data = response.data;
  return (
    <div>
      {data.title}
      {data.body}
    </div>
  );
}
