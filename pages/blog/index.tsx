import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Post, { firestoreCollectionToPostArray } from "../../types/Post";
import PostCard from "../../components/pure/postcard";
import { GetServerSideProps } from "next";
import { firestore } from "../../lib/firebase";

const Blog = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="px-4 pt-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postCollection = collection(firestore, "posts");
  const docs = await getDocs(query(postCollection, orderBy("published_at", "desc")));
  const mappedDocs = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const posts = firestoreCollectionToPostArray(mappedDocs);

  return { props: { posts: posts } };
};

export default Blog;
