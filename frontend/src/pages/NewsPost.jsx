import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { 
  ArrowLeft, 
  Calendar, 
  Share2, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon,
  Check
} from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

export default function NewsPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);

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

  // Variables for sharing
  const currentUrl = window.location.href;
  const postTitle = post?.title || "Check out this news";

  /* --- Native Share (Mobile) --- */
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    } else {
      // Fallback: Copy link if native share isn't supported
      copyToClipboard();
    }
  };

  /* --- Copy Link --- */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-green-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  const components = {
    types: {
      image: ({ value }) => (
        <img src={urlFor(value).width(1200).url()} alt="" className="rounded-2xl my-10 shadow-xl" />
      ),
    },
    marks: {
      link: ({ value, children }) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-green-700 underline font-medium hover:text-green-900">
          {children}
        </a>
      ),
    },
    block: {
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-green-600 bg-slate-50 pl-6 py-2 italic rounded-r-xl my-6">{children}</blockquote>
      ),
      h1: ({ children }) => <h1 className="font-serif text-4xl mt-12 mb-6 text-slate-900">{children}</h1>,
      h2: ({ children }) => <h2 className="font-serif text-3xl mt-10 mb-5 text-slate-900">{children}</h2>,
      h3: ({ children }) => <h3 className="font-serif text-2xl mt-8 mb-4 text-slate-900">{children}</h3>,
    },
  };

  return (
    <div className="bg-white min-h-screen selection:bg-green-100">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-2">
          <Link to="/news" className="group flex items-center gap-2 text-slate-900 font-bold hover:text-green-700 transition-colors">
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

        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-xs uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><Clock size={12} /> 5 Min Read</span>
            <span>•</span>
            <span className="text-green-600">Verified Press Release</span>
          </div>
        </header>

        {post.image && (
          <div className="mb-14 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
            <img src={urlFor(post.image).width(1400).url()} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-img:rounded-2xl">
          {post.body ? <PortableText value={post.body} components={components} /> : <p className="italic text-slate-400">Content updated soon.</p>}
        </div>

        {/* --- FIXED FOOTER SHARE SECTION --- */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Share this Article
          </p>

          <div className="flex items-center gap-2">
            {/* Facebook */}
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-full transition-all"
            >
              <Facebook size={20} />
            </a>

            {/* Twitter / X */}
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(postTitle)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 hover:bg-sky-100 text-slate-600 hover:text-sky-500 rounded-full transition-all"
            >
              <Twitter size={20} />
            </a>

            {/* LinkedIn */}
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 hover:bg-blue-100 text-slate-600 hover:text-blue-700 rounded-full transition-all"
            >
              <Linkedin size={20} />
            </a>

            {/* Copy Link Button */}
            <button 
              onClick={copyToClipboard}
              className="p-2.5 bg-slate-50 hover:bg-green-100 text-slate-600 hover:text-green-700 rounded-full transition-all"
            >
              {copied ? <Check size={20} className="text-green-600" /> : <LinkIcon size={20} />}
            </button>

            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            {/* Native Share Button (Best for Mobile) */}
            <button 
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-green-100"
            >
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}