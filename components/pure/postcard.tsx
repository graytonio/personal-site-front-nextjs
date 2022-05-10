import Post from "../../types/Post";
import Badge from "./badge";
import FirebaseImage from "../firebaseimage";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article data-testid="post-card" key={post.title} className="flex bg-highlight flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-2xl bg-white">
      <Link href={post.href}>
        <a className="block relative h-64 md:h-48">
          <FirebaseImage imageReference={post.imageRef} loadingClassName="h-10 w-10 mx-auto mt-6" imgClassName="h-72 w-full" />
        </a>
      </Link>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1 max-h-64 overflow-hidden">
          <a href={post.href}>
            <p className="text-xl font-semibold text-">{post.title}</p>
            <p className="mt-3 text-base text-gray-500">{post.summary}</p>
          </a>
        </div>
        <div className="flex flex-wrap flex-row gap-2">
          {post.tags.map((tag, i) => (
            // <a key={i} href={"#" + tag}>
            <Badge key={i} className="bg-green-200" text={tag} />
            // </a>
          ))}
        </div>
        <div className="mt-2 flex items-center space-x-1 text-sm text-gray-500">
          <time dateTime={new Date(post.created).toDateString()}>{new Date(post.created).toDateString()}</time>
        </div>
      </div>
    </article>
  );
}
