import BlogNavigator from "../../components/navigatorComponent";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type pageProps = {
  params: Promise<{ blogs: string }>;
};

export default async function Blogs({ params }: pageProps) {
  const blogId = (await params).blogs;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${blogId}`
  );
  const postData: Post = await res.json();

  return (
    <div>
      <BlogNavigator />
      <h1>Blog: {postData.title}</h1>
      <p>{postData.body}</p>
    </div>
  );
}
