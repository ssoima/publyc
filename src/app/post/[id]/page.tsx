import { posts } from "@/data/posts";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <article className="space-y-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        
        {post.media && (
          <img 
            src={post.media} 
            alt={post.title}
            className="w-full rounded-lg object-cover"
          />
        )}
        
        <div className="prose dark:prose-invert">
          <p>{post.details}</p>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">X Post</h2>
            <p className="text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              {post.x_description}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">LinkedIn Post</h2>
            <p className="text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              {post.linkedin_description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
} 