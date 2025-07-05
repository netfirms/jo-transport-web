// Mock implementation of script.js for tests

// Mock form validation
function validateForm(form) {
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const phone = form.querySelector('#phone').value.trim();
  const service = form.querySelector('#service').value;
  const message = form.querySelector('#message').value.trim();

  // Required fields validation
  if (name === '' || email === '' || service === '') {
    alert(translations.contact.form.validation.required[currentLanguage]);
    return false;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    alert(translations.contact.form.validation.email[currentLanguage]);
    return false;
  }

  // Phone validation
  if (phone && !/^[+\d\s\-()]{7,20}$/.test(phone)) {
    alert("Please enter a valid phone number.");
    return false;
  }

  // Message validation
  if (message && (message.length > 1000 || /<script|<\/script|javascript:/i.test(message))) {
    alert("Please enter a valid message (max 1000 characters, no scripts).");
    return false;
  }

  return true;
}

// Mock language switching
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);

  // Handle RTL for Arabic
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  // Add or remove RTL-specific classes
  if (lang === 'ar') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }

  // Update all translatable elements
  updatePageContent();
}

// Mock translation completeness checking
function checkTranslationsComplete() {
  const supportedLanguages = ['en', 'th', 'zh', 'ar', 'ja', 'ko', 'ms', 'ru'];
  const missingTranslations = [];
  const languageCounts = {
    en: 0,
    th: 0,
    zh: 0,
    ar: 0,
    ja: 0,
    ko: 0,
    ms: 0,
    ru: 0
  };
  let totalTranslationKeys = 0;

  // Recursive function to check translations
  function checkTranslationObject(obj, path = '') {
    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;

      // If this is a translation entry (has language keys)
      if (typeof obj[key] === 'object' && (obj[key].en !== undefined || obj[key].th !== undefined || obj[key].zh !== undefined || obj[key].ar !== undefined)) {
        totalTranslationKeys++;

        // Check if all languages are present
        for (const lang of supportedLanguages) {
          if (obj[key][lang] === undefined) {
            missingTranslations.push({
              path: currentPath,
              language: lang
            });
          } else {
            languageCounts[lang]++;
          }
        }
      } 
      // If this is a nested object, recurse into it
      else if (typeof obj[key] === 'object' && key !== 'languageNames') {
        checkTranslationObject(obj[key], currentPath);
      }
    }
  }

  // Start the recursive check
  checkTranslationObject(translations);

  // Calculate completion percentages
  const completionStats = {};
  for (const lang of supportedLanguages) {
    completionStats[lang] = {
      count: languageCounts[lang],
      total: totalTranslationKeys,
      percentage: Math.round((languageCounts[lang] / totalTranslationKeys) * 100)
    };
  }

  // Log results
  if (missingTranslations.length > 0) {
    console.group('⚠️ TRANSLATION CHECK: Incomplete Translations');
    console.log('Missing translations found:');
    console.table(missingTranslations);
    console.log('Translation completion statistics:');
    console.table(completionStats);
    console.groupEnd();

    // Show warning in development environment
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const warningDiv = document.createElement('div');
      document.body.appendChild(warningDiv);
    }

    return false;
  } else {
    console.group('✅ TRANSLATION CHECK: All Translations Complete');
    console.log('All translations are complete!');
    console.log('Translation statistics:');
    console.table(completionStats);
    console.groupEnd();
    return true;
  }
}

// Export the mocks
module.exports = {
  validateForm,
  changeLanguage,
  checkTranslationsComplete
};