
'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const inputStyle = {
    display: 'block',
    boxSizing: 'border-box' as const,
    width: '100%',
    padding: '12px 14px',
    marginTop: 8,
    marginBottom: 18,
    border: '1px solid #475569',
    borderRadius: 10,
    background: '#1e293b',
    color: '#ffffff',
    fontSize: 15,
    outline: 'none',
  };

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setMessage('');
    setSuccess(false);

    if (!name.trim() || !email.trim() || !password) {
      setMessage('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    if (password.length < 8) {
      setMessage('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองอีกครั้ง'
        );
      }

      setSuccess(true);
      setMessage(data.message || 'สมัครสมาชิกสำเร็จ!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setSuccess(false);

      setMessage(
        error instanceof Error
          ? error.message
          : 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        background:
          'linear-gradient(135deg, #0f172a 0%, #312e81 55%, #581c87 100%)',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 430,
          padding: 32,
          boxSizing: 'border-box',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20,
          background: 'rgba(15,23,42,0.92)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1
            style={{
              margin: '0 0 10px',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            สมัครสมาชิก
          </h1>

          <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>
            สร้างบัญชีของคุณเพื่อเริ่มต้นใช้งาน
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name" style={{ fontSize: 14, fontWeight: 600 }}>
            ชื่อ-นามสกุล
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="กรอกชื่อ-นามสกุล"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={inputStyle}
            required
            disabled={loading}
          />

          <label htmlFor="email" style={{ fontSize: 14, fontWeight: 600 }}>
            อีเมล
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={inputStyle}
            required
            disabled={loading}
          />

          <label
            htmlFor="password"
            style={{ fontSize: 14, fontWeight: 600 }}
          >
            รหัสผ่าน
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="อย่างน้อย 8 ตัวอักษร"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={inputStyle}
            minLength={8}
            required
            disabled={loading}
          />

          {message && (
            <p
              role="status"
              aria-live="polite"
              style={{
                padding: 12,
                margin: '0 0 18px',
                borderRadius: 8,
                background: success ? '#064e3b' : '#7f1d1d',
                color: '#ffffff',
                fontSize: 14,
                lineHeight: 1.6,
                overflowWrap: 'anywhere',
              }}
            >
              {message}
              {success && (
                <>
                  {' '}
                  <a
                    href="/login"
                    style={{
                      color: '#ddd6fe',
                      fontWeight: 700,
                    }}
                  >
                    ไปหน้าเข้าสู่ระบบ
                  </a>
                </>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 14,
              marginTop: 4,
              border: 'none',
              borderRadius: 10,
              background: loading ? '#64748b' : '#7c3aed',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
          </button>
        </form>

        <p
          style={{
            marginTop: 24,
            marginBottom: 0,
            textAlign: 'center',
            color: '#cbd5e1',
            fontSize: 14,
          }}
        >
          มีบัญชีอยู่แล้ว?{' '}
          <a
            href="/login"
            style={{
              color: '#c4b5fd',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            เข้าสู่ระบบ
          </a>
        </p>
      </section>
    </main>
  );
}
