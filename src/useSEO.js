import { useEffect } from 'react';

export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', description);
    }
    return () => {
      document.title = 'Dolphin AI | Intelligent Spend Classification & Procurement Analytics';
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', 'Dolphin AI normalizes supplier names, classifies spend using your taxonomy, and reveals savings opportunities hidden in your procurement data. Built for procurement and finance teams.');
    };
  }, [title, description]);
}
