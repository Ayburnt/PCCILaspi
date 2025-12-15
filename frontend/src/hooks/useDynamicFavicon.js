import { useEffect } from 'react';
import { client, urlFor } from '../sanityClient';

export default function useDynamicFavicon() {
  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]{
      logo {
        asset -> {
          _id,
          url
        }
      },
      organizationName,
      organizationSubtitle
    }`;

    const applyHead = (data) => {
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

      const name = data?.organizationName?.trim();
      const subtitle = data?.organizationSubtitle?.trim();
      const title = name ? `${name}${subtitle ? ' — ' + subtitle : ''}` : 'PCCI Las Piñas';
      document.title = title;
    };

    let isMounted = true;
    let subscription;

    const fetchAndApply = async () => {
      try {
        const data = await client.fetch(query);
        if (!isMounted) return;
        applyHead(data);
      } catch (error) {
        console.error('Error updating favicon/title:', error);
      }
    };

    fetchAndApply();

    // Live updates from Sanity Studio publishes
    subscription = client
      .listen(query, {}, { visibility: 'query' })
      .subscribe((update) => {
        if (!isMounted) return;
        if (update?.result) {
          applyHead(update.result);
        }
      }, (error) => console.error('Error listening for settings updates:', error));

    return () => {
      isMounted = false;
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);
}
