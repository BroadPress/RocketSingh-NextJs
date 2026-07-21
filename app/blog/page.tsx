import BlogCard from "../../components/BlogCard";
import { blogPosts } from "../data/blogPosts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">RocketSingh Blog</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Stay updated with expert cleaning tips, professional services, and home & office hygiene advice from RocketSingh.
        </p>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <BlogCard
              key={blog.slug}
              slug={blog.slug}
              title={blog.title}
              description={blog.description}
              image={blog.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
