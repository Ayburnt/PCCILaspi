import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

export default function NewsPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const query = `*[_type == "news" && slug.current == $slug][0]`;
    client.fetch(query, { slug })
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  if (!post) return <div className="text-center py-20">Loading article...</div>;

  return (
    <div className="bg-white min-h-screen">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-12">

        <Link to="/news" className="text-black-900 font-bold flex items-center gap-2 mb-8">
          <ArrowLeft size={20} /> Back to News
        </Link>

        {/* Category + Date */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b pb-4">
            <span className="bg-blue-100 text-green-900 px-2 py-1 rounded font-bold uppercase text-xs">
                {post.category}
            </span>
            <span className="flex items-center gap-1">
                <Calendar size={14}/> {post.date}
            </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-black-950 mb-8">
          {post.title}
        </h1>

        {/* Image */}
        {post.image && (
          <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={urlFor(post.image).width(1200).url()} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          {post.body ? <PortableText value={post.body} /> : <p>No content available.</p>}
        </div>
      </article>

      <Footer />
    </div>
  );
}
