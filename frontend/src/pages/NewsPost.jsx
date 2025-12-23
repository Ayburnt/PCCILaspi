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
    const query = `
      *[_type == "news" && slug.current == $slug][0]{
        title,
        slug,
        date,
        category,
        image,
        body
      }
    `;

    client
      .fetch(query, { slug })
      .then(setPost)
      .catch(console.error);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-green-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  /* ----------------------------------
     Portable Text Custom Renderers
  ----------------------------------- */
  const components = {
    types: {
      image: ({ value }) => (
        <img
          src={urlFor(value).width(1200).url()}
          alt=""
          className="rounded-2xl my-10 shadow-xl"
        />
      ),
    },
    marks: {
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline font-medium hover:text-green-900"
        >
          {children}
        </a>
      ),
    },
    block: {
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-green-600 bg-slate-50 pl-6 py-2 italic rounded-r-xl my-6">
          {children}
        </blockquote>
      ),
      h1: ({ children }) => (
        <h1 className="font-serif text-4xl mt-12 mb-6 text-slate-900">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="font-serif text-3xl mt-10 mb-5 text-slate-900">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-serif text-2xl mt-8 mb-4 text-slate-900">
          {children}
        </h3>
      ),
    },
  };

  return (
    <div className="bg-white min-h-screen selection:bg-green-100">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-2">
          <Link
            to="/news"
            className="group flex items-center gap-2 text-slate-900 font-bold hover:text-green-700 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to News
          </Link>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-widest border border-green-100">
              {post.category}
            </span>

            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

            <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <Calendar size={14} className="text-slate-400" />
              {post.date}
            </span>
          </div>
        </div>

        {/* Title */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-slate-400 text-xs uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1">
              <Clock size={12} /> 5 Min Read
            </span>
            <span>•</span>
            <span className="text-green-600">Verified Press Release</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.image && (
          <div className="mb-14 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
            <img
              src={urlFor(post.image).width(1400).url()}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="
            prose prose-lg prose-slate max-w-none
            prose-headings:font-serif
            prose-headings:text-slate-900
            prose-p:text-slate-700
            prose-p:leading-relaxed
            prose-strong:text-slate-900
            prose-strong:font-bold
            prose-img:rounded-2xl
          "
        >
          {post.body ? (
            <PortableText value={post.body} components={components} />
          ) : (
            <p className="italic text-slate-400">
              The content for this article is currently being updated.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            End of Article
          </p>

          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-green-700">
            <Share2 size={20} />
          </button>
        </div>
      </article>

      <Footer />
    </div>
  );
}
