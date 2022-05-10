import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { GetStaticProps, GetStaticPaths } from "next";
import { firestore } from "../../lib/firebase";
import Post, { firestoreCollectionToPostArray } from "../../types/Post";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import FirebaseImage from "../../components/firebaseimage";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <div className="flex flex-col-reverse divide-y-2 divide-y-reverse divide-accent w-full">
      <section className="prose pt-4 mx-auto">
        <span className="text-4xl font-bold font-serif pt-4">{post.title}</span>
        <ReactMarkdown remarkPlugins={[gfm]}>{post.content}</ReactMarkdown>
      </section>

      <div className="h-48 w-full relative">
        <FirebaseImage imageReference={post.imageRef} imgClassName="h-full" loadingClassName="h-full mx-auto" />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true };

  const postCollection = collection(firestore, "posts");
  const docs = await getDocs(query(postCollection, where("slug", "==", params["slug"]), limit(1)));
  const post = firestoreCollectionToPostArray(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })))[0];

  return { props: { post: post }, revalidate: 60 };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const postCollection = collection(firestore, "posts");
  const docs = await getDocs(postCollection);
  const slugs = docs.docs.map((doc) => ({ params: { slug: doc.data()["slug"] } }));

  return { paths: slugs, fallback: "blocking" };
};
