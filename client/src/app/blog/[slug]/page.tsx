import { getBlogPost, getBlogPosts } from "@/lib/api";
import React from "react";
import parse from "html-react-parser";

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.entryId,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("slug", slug);

  const { title, body, featuredimage } = await getBlogPost(slug);

  const htmlBlogPost = parse(body, {
    // replace: (node: DOMNode) => {
    //   // Optionally, you can add more logic to handle specific HTML elements here.
    // }
  });

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      {title && (
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          {title}
        </h1>
      )}

      {/* Featured Image */}
      {featuredimage && (
        <img
          className="w-full rounded-lg mb-8 shadow-lg"
          src={featuredimage}
          alt={title ?? "Featured Image"}
        />
      )}

      {/* Article */}
      <article className="prose prose-slate max-w-none space-y-6">
        <div>{htmlBlogPost}</div>
      </article>

      {/* Additional SEO Enhancements */}
      <footer className="mt-12 text-sm text-gray-500">
        <p>Published on: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}

