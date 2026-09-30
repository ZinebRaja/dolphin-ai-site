import { useEffect } from 'react';

export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', description);
    }
    return () => {
      document.title = 'Dolphin AI | Intelligent Spend Classification & Supply Chain Analytics';
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', 'Dolphin AI normalizes supplier names, classifies spend using your taxonomy, and reveals savings opportunities hidden in your supply chain data. Built for supply chain and finance teams.');
    };
  }, [title, description]);
}
