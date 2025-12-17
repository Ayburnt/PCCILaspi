import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, Share2, Clock } from 'lucide-react';
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

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-green-700 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen selection:bg-green-100">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-10">
        
        {/* --- Header Row: Back Link (Left) + Metadata (Right) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-1">
          
          {/* Left Corner */}
          <Link 
            to="/news" 
            className="group flex items-center gap-2 text-slate-900 font-bold hover:text-green-700 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to News
          </Link>

          {/* Right Corner */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-widest border border-green-100">
              {post.category}
            </span>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <Calendar size={14} className="text-slate-400" /> {post.date}
            </span>
          </div>
        </div>

        {/* --- Title Section --- */}
        <header className="mb-5">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          {/* Reading Time Mock - Adds a modern editorial touch */}
          <div className="flex items-center gap-4 text-slate-400 text-xs uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><Clock size={12}/> 5 Min Read</span>
            <span>•</span>
            <span className="text-green-600">Verified Press Release</span>
          </div>
        </header>

        {/* --- Featured Image --- */}
        {post.image && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 group">
            <img 
              src={urlFor(post.image).width(1200).url()} 
              alt={post.title} 
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        )}

        {/* --- Article Body --- */}
        <div className="prose prose-lg prose-slate max-w-none 
          prose-headings:font-serif prose-headings:text-slate-900 
          prose-p:text-slate-700 prose-p:leading-relaxed
          prose-strong:text-slate-900 prose-strong:font-bold
          prose-img:rounded-2xl prose-blockquote:border-green-600 
          prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:rounded-r-xl">
          
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="italic text-slate-400">The content for this article is currently being updated.</p>
          )}
        </div>

        {/* --- Share Section (Optional Add-on) --- */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">End of Article</p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-600">Share:</span>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-blue-600">
               <Share2 size={20} />
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}