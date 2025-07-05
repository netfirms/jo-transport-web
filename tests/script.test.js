/**
 * Unit tests for script.js
 */

// Import the DOM testing utilities
import { fireEvent, getByText, getByLabelText, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';

// Mock translations object
global.translations = {
  contact: {
    form: {
      validation: {
        required: { 
          en: 'Please fill in all required fields.',
          th: 'กรุณากรอกข้อมูลในช่องที่จำเป็นทั้งหมด',
          zh: '请填写所有必填字段。',
          ar: 'يرجى ملء جميع الحقول المطلوبة.',
          ja: '必須項目をすべて入力してください。',
          ko: '모든 필수 필드를 작성해 주세요.',
          ms: 'Sila isi semua medan yang diperlukan.',
          ru: 'Пожалуйста, заполните все обязательные поля.'
        },
        email: { 
          en: 'Please enter a valid email address.',
          th: 'กรุณากรอกที่อยู่อีเมลที่ถูกต้อง',
          zh: '请输入有效的电子邮件地址。',
          ar: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
          ja: '有効なメールアドレスを入力してください。',
          ko: '유효한 이메일 주소를 입력하세요.',
          ms: 'Sila masukkan alamat e-mel yang sah.',
          ru: 'Пожалуйста, введите действительный адрес электронной почты.'
        },
        error: { 
          en: 'An error occurred. Please try again.',
          th: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
          zh: '发生错误。请再试一次。',
          ar: 'حدث خطأ. حاول مرة اخرى.',
          ja: 'エラーが発生しました。もう一度お試しください。',
          ko: '오류가 발생했습니다. 다시 시도해 주세요.',
          ms: 'Ralat telah berlaku. Sila cuba lagi.',
          ru: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.'
        }
      },
      sending: { 
        en: 'Sending...',
        th: 'กำลังส่ง...',
        zh: '发送中...',
        ar: 'جاري الإرسال...',
        ja: '送信中...',
        ko: '전송 중...',
        ms: 'Menghantar...',
        ru: 'Отправка...'
      },
      success: {
        title: { 
          en: 'Thank You!',
          th: 'ขอบคุณ!',
          zh: '谢谢！',
          ar: 'شكرا لك!',
          ja: 'ありがとうございます！',
          ko: '감사합니다!',
          ms: 'Terima Kasih!',
          ru: 'Спасибо!'
        },
        message: { 
          en: 'Your message has been sent successfully. We will get back to you soon.',
          th: 'ส่งข้อความของคุณเรียบร้อยแล้ว เราจะติดต่อกลับในเร็วๆ นี้',
          zh: '您的消息已成功发送。我们将很快回复您。',
          ar: 'تم إرسال رسالتك بنجاح. سنرد عليك قريبا.',
          ja: 'メッセージが正常に送信されました。すぐにご連絡いたします。',
          ko: '메시지가 성공적으로 전송되었습니다. 곧 연락 드리겠습니다.',
          ms: 'Mesej anda telah berjaya dihantar. Kami akan menghubungi anda tidak lama lagi.',
          ru: 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.'
        },
        button: { 
          en: 'Send Another Message',
          th: 'ส่งข้อความอื่น',
          zh: '发送另一条消息',
          ar: 'إرسال رسالة أخرى',
          ja: '別のメッセージを送信',
          ko: '다른 메시지 보내기',
          ms: 'Hantar Mesej Lain',
          ru: 'Отправить другое сообщение'
        }
      },
      submit: { 
        en: 'Submit',
        th: 'ส่ง',
        zh: '提交',
        ar: 'إرسال',
        ja: '送信',
        ko: '제출',
        ms: 'Hantar',
        ru: 'Отправить'
      }
    }
  },
  languageNames: {
    en: "English",
    th: "ไทย",
    zh: "中文",
    ar: "العربية",
    ja: "日本語",
    ko: "한국어",
    ms: "Bahasa Melayu",
    ru: "Русский"
  }
};

// Mock document structure for form testing
function setupFormTest() {
  // Create a mock DOM structure for the form
  document.body.innerHTML = `
    <div id="contact">
      <form id="quote-form">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" required>
        </div>
        <div>
          <label for="phone">Phone</label>
          <input type="tel" id="phone">
        </div>
        <div>
          <label for="service">Service</label>
          <select id="service" required>
            <option value="">Select a service</option>
            <option value="airport">Airport Transfer</option>
            <option value="city">City Tour</option>
          </select>
        </div>
        <div>
          <label for="message">Message</label>
          <textarea id="message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  `;

  // Return the form element for testing
  return document.getElementById('quote-form');
}

describe('Form Validation', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Set up the form for testing
    setupFormTest();

    // Set the current language
    global.currentLanguage = 'en';

    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };

    // Load the script to test
    require('../js/script.js');
  });

  test('should validate required fields', () => {
    // Get the form
    const form = document.getElementById('quote-form');

    // Submit the form without filling required fields
    fireEvent.submit(form);

    // Check if alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith(translations.contact.form.validation.required.en);
  });

  test('should validate email format', () => {
    // Get the form
    const form = document.getElementById('quote-form');

    // Fill in name and service but use invalid email
    document.getElementById('name').value = 'Test User';
    document.getElementById('email').value = 'invalid-email';
    document.getElementById('service').value = 'airport';

    // Submit the form
    fireEvent.submit(form);

    // Check if alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith(translations.contact.form.validation.email.en);
  });

  test('should validate phone format if provided', () => {
    // Get the form
    const form = document.getElementById('quote-form');

    // Fill in required fields
    document.getElementById('name').value = 'Test User';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('service').value = 'airport';

    // Add invalid phone
    document.getElementById('phone').value = 'not-a-phone';

    // Submit the form
    fireEvent.submit(form);

    // Check if alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid phone number.");
  });

  test('should validate message length and content', () => {
    // Get the form
    const form = document.getElementById('quote-form');

    // Fill in required fields
    document.getElementById('name').value = 'Test User';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('service').value = 'airport';

    // Add message with script tag (potential XSS)
    document.getElementById('message').value = '<script>alert("XSS")</script>';

    // Submit the form
    fireEvent.submit(form);

    // Check if alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid message (max 1000 characters, no scripts).");
  });

  test('should accept valid form submission', () => {
    // Get the form
    const form = document.getElementById('quote-form');

    // Fill in all fields with valid data
    document.getElementById('name').value = 'Test User';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('phone').value = '+1 (555) 123-4567';
    document.getElementById('service').value = 'airport';
    document.getElementById('message').value = 'This is a test message';

    // Mock the emailjs.send function
    global.emailjs.send.mockResolvedValue({ status: 200 });

    // Submit the form
    fireEvent.submit(form);

    // Check that no validation alerts were shown
    expect(global.alert).not.toHaveBeenCalled();

    // Check that emailjs.send was called
    expect(global.emailjs.send).toHaveBeenCalled();
  });
});

describe('Language Switching', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Set up a mock DOM for language testing
    document.body.innerHTML = `
      <html>
        <body>
          <select id="language-selector">
            <option value="en">English</option>
            <option value="th">ไทย</option>
            <option value="zh">中文</option>
            <option value="ar">العربية</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="ru">Русский</option>
          </select>
          <div data-i18n="header.title">Welcome</div>
          <div data-i18n="about.description">About us text</div>
        </body>
      </html>
    `;

    // Mock translations
    global.translations = {
      header: {
        title: {
          en: 'Welcome',
          th: 'ยินดีต้อนรับ',
          zh: '欢迎',
          ar: 'مرحبا',
          ja: 'ようこそ',
          ko: '환영합니다',
          ms: 'Selamat datang',
          ru: 'Добро пожаловать'
        }
      },
      about: {
        description: {
          en: 'About us text',
          th: 'เกี่ยวกับเรา',
          zh: '关于我们',
          ar: 'معلومات عنا',
          ja: '私たちについて',
          ko: '회사 소개',
          ms: 'Tentang kami',
          ru: 'О нас'
        }
      },
      languageNames: {
        en: "English",
        th: "ไทย",
        zh: "中文",
        ar: "العربية",
        ja: "日本語",
        ko: "한국어",
        ms: "Bahasa Melayu",
        ru: "Русский"
      }
    };

    // Set default language
    global.currentLanguage = 'en';

    // Load the script
    require('../js/script.js');
  });

  test('should change language when selector changes', () => {
    // Get the language selector
    const languageSelector = document.getElementById('language-selector');

    // Change language to Thai
    languageSelector.value = 'th';
    fireEvent.change(languageSelector);

    // Check if localStorage was updated
    expect(global.localStorage.setItem).toHaveBeenCalledWith('language', 'th');

    // Check if text was updated
    const headerTitle = document.querySelector('[data-i18n="header.title"]');
    expect(headerTitle.textContent).toBe('ยินดีต้อนรับ');
  });

  test('should handle RTL for Arabic language', () => {
    // Get the language selector
    const languageSelector = document.getElementById('language-selector');

    // Change language to Arabic
    languageSelector.value = 'ar';
    fireEvent.change(languageSelector);

    // Check if dir attribute was set to RTL
    expect(document.documentElement.dir).toBe('rtl');

    // Check if body has RTL class
    expect(document.body.classList.contains('rtl')).toBe(true);
  });

  test('should change to Japanese language', () => {
    // Get the language selector
    const languageSelector = document.getElementById('language-selector');

    // Change language to Japanese
    languageSelector.value = 'ja';
    fireEvent.change(languageSelector);

    // Check if localStorage was updated
    expect(global.localStorage.setItem).toHaveBeenCalledWith('language', 'ja');

    // Check if text was updated
    const headerTitle = document.querySelector('[data-i18n="header.title"]');
    expect(headerTitle.textContent).toBe('ようこそ');
  });

  test('should change to Korean language', () => {
    // Get the language selector
    const languageSelector = document.getElementById('language-selector');

    // Change language to Korean
    languageSelector.value = 'ko';
    fireEvent.change(languageSelector);

    // Check if localStorage was updated
    expect(global.localStorage.setItem).toHaveBeenCalledWith('language', 'ko');

    // Check if text was updated
    const headerTitle = document.querySelector('[data-i18n="header.title"]');
    expect(headerTitle.textContent).toBe('환영합니다');
  });

  test('should change to Malay language', () => {
    // Get the language selector
    const languageSelector = document.getElementById('language-selector');

    // Change language to Malay
    languageSelector.value = 'ms';
    fireEvent.change(languageSelector);

    // Check if localStorage was updated
    expect(global.localStorage.setItem).toHaveBeenCalledWith('language', 'ms');

    // Check if text was updated
    const headerTitle = document.querySelector('[data-i18n="header.title"]');
    expect(headerTitle.textContent).toBe('Selamat datang');
  });
});

describe('Translation Completeness Checking', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock console methods
    global.console.group = jest.fn();
    global.console.log = jest.fn();
    global.console.table = jest.fn();
    global.console.groupEnd = jest.fn();
    global.console.warn = jest.fn();

    // Mock document.createElement and appendChild for warning div
    document.createElement = jest.fn().mockReturnValue({
      style: {},
      appendChild: jest.fn()
    });
    document.body.appendChild = jest.fn();

    // Set up a basic DOM
    document.body.innerHTML = '<div></div>';
  });

  test('should check for complete translations', () => {
    // Create a complete translations object
    global.translations = {
      test: {
        key1: {
          en: 'English',
          th: 'Thai',
          zh: 'Chinese',
          ar: 'Arabic',
          ja: 'Japanese',
          ko: 'Korean',
          ms: 'Malay',
          ru: 'Russian'
        },
        key2: {
          en: 'Hello',
          th: 'สวัสดี',
          zh: '你好',
          ar: 'مرحبا',
          ja: 'こんにちは',
          ko: '안녕하세요',
          ms: 'Helo',
          ru: 'Привет'
        }
      },
      languageNames: {
        en: "English",
        th: "ไทย",
        zh: "中文",
        ar: "العربية",
        ja: "日本語",
        ko: "한국어",
        ms: "Bahasa Melayu",
        ru: "Русский"
      }
    };

    // Load the script to test
    require('../js/script.js');

    // The checkTranslationsComplete function should be called automatically
    // Check that console.group was called with success message
    expect(global.console.group).toHaveBeenCalledWith(
      expect.stringContaining('✅ TRANSLATION CHECK: All Translations Complete')
    );

    // No warning div should be created
    expect(document.createElement).not.toHaveBeenCalled();
  });

  test('should detect incomplete translations', () => {
    // Create an incomplete translations object
    global.translations = {
      test: {
        key1: {
          en: 'English',
          th: 'Thai',
          zh: 'Chinese',
          ar: 'Arabic',
          // Missing ja, ko, ms, ru
        },
        key2: {
          en: 'Hello',
          th: 'สวัสดี',
          zh: '你好',
          ar: 'مرحبا',
          ja: 'こんにちは',
          ko: '안녕하세요',
          ms: 'Helo',
          ru: 'Привет'
        }
      },
      languageNames: {
        en: "English",
        th: "ไทย",
        zh: "中文",
        ar: "العربية",
        ja: "日本語",
        ko: "한국어",
        ms: "Bahasa Melayu",
        ru: "Русский"
      }
    };

    // Mock window.location for development environment
    delete global.window.location;
    global.window.location = {
      hostname: 'localhost'
    };

    // Load the script to test
    require('../js/script.js');

    // The checkTranslationsComplete function should be called automatically
    // Check that console.group was called with warning message
    expect(global.console.group).toHaveBeenCalledWith(
      expect.stringContaining('⚠️ TRANSLATION CHECK: Incomplete Translations')
    );

    // Check that console.table was called with missing translations
    expect(global.console.table).toHaveBeenCalled();

    // In development environment, a warning div should be created
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(document.body.appendChild).toHaveBeenCalled();
  });
});
