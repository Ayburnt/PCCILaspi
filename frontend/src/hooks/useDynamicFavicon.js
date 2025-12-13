import { useEffect } from 'react';
import { client, urlFor } from '../sanityClient';

export default function useDynamicFavicon() {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const query = `*[_type == "siteSettings"][0]{
          logo {
            asset -> {
              _id,
              url
            }
          }
        }`;

        const data = await client.fetch(query);
        
        if (data?.logo) {
          const faviconUrl = urlFor(data.logo).width(32).height(32).url();
          
          // Remove existing favicon
          const existingFavicon = document.querySelector("link[rel*='icon']");
          if (existingFavicon) {
            existingFavicon.remove();
          }

          // Create new favicon link
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          link.href = faviconUrl;
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error('Error updating favicon:', error);
      }
    };

    updateFavicon();
  }, []);
}
