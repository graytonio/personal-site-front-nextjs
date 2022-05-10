import { DocumentData } from "firebase/firestore";

export default interface Post {
  id: string;
  href: string;
  title: string;
  imageRef: string;
  summary: string | null;
  content: string;
  tags: string[];
  created: number;
  updated: number;
}

export function firestoreCollectionToPostArray(data: DocumentData[]): Post[] {
  const posts: Post[] = data.map((doc, index) => ({
    id: doc.id,
    created: doc.published_at.seconds * 1000,
    updated: doc.updated_at.seconds * 1000,
    content: doc.body,
    summary: doc.summary ? doc.summary : "",
    tags: doc.tags,
    title: doc.title,
    imageRef: doc.header_image,
    href: `/blog/${doc.slug}`,
  }));

  return posts;
}
