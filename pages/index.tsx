import type { GetStaticProps } from "next";
import Image from "next/image";
import { firestore } from "../lib/firebase";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import Post, { firestoreCollectionToPostArray } from "../types/Post";
import PostCard from "../components/pure/postcard";

const tmpImage = "/tmp.jfif";

const Home = ({ featured }: { featured: Post[] }) => {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 pt-4 sm:px-6 md:px-8">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="hidden md:block md:col-span-1">
          <Image src={tmpImage} layout="responsive" height="1" width="1" objectFit="cover" alt="headshot" className="rounded-lg" />
        </div>
        <div className="col-span-4 md:col-span-3">
          <div className="text-3xl font-bold">Grayton Ward</div>
          <div className="md:pl-4">DevOps Engineer, Software Engineer, IoT Device Maker, Tinkerer</div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-3xl font-extrabold text-center text-accent">Featured Posts</div>
        {featured.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postCollection = collection(firestore, "posts");
  const docs = await getDocs(query(postCollection, where("featured", "==", true), orderBy("published_at", "desc"), limit(3)));
  const mappeliocs = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const posts = firestoreCollectionToPostArray(mappeliocs);

  return { props: { featured: posts }, revalidate: 60 * 60 };
};

export default Home;
