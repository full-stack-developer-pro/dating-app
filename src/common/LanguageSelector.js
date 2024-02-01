// LanguageSelector.js
import React, { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const [isTranslatorLoaded, setTranslatorLoaded] = useState(false);

  const loadGoogleTranslate = () => {
    if (!isTranslatorLoaded && !window.googleTranslateLoaded) {
      window.googleTranslateElementInit = () => {
        const translator = new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'es,en,fr,pb',
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      // Append script to document.body instead of document.head
      document.body.appendChild(script);

      setTranslatorLoaded(true);
      window.googleTranslateLoaded = true;
    }
  };

  useEffect(() => {
    loadGoogleTranslate();
  }, [isTranslatorLoaded]);

  return isTranslatorLoaded ? <div id="google_translate_element"></div> : null;
};

export default LanguageSelector;
