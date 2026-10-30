
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginUser = {
  id: number | string;
  name: string;
  email: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setMessage('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
        return;
      }

      if (!data.user?.name || !data.user?.email) {
        setMessage('ไม่พบข้อมูลผู้ใช้ที่จำเป็น กรุณาลองใหม่');
        return;
      }

      // เก็บเฉพาะข้อมูลทั่วไปของผู้ใช้ ไม่เก็บรหัสผ่านหรือ JWT
      const user: LoginUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };

      localStorage.setItem('user', JSON.stringify(user));

      setSuccess(true);
      setMessage('เข้าสู่ระบบสำเร็จ! กำลังไปหน้า Dashboard...');

      // API /api/login จะเป็นผู้ตั้ง HttpOnly Cookie token
      router.replace('/dashboard');
    } catch (error) {
      console.error('Login request failed:', error);
      setMessage('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    padding: '13px 14px',
    marginTop: 8,
    marginBottom: 20,
    border: '1px solid #334155',
    borderRadius: 10,
    background: '#0f172a',
    color: '#f8fafc',
    fontSize: 15,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: 600,
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background:
          'radial-gradient(circle at top, #312e81 0%, #111827 45%, #020617 100%)',
        color: '#f8fafc',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 440,
          boxSizing: 'border-box',
          padding: 32,
          border: '1px solid #334155',
          borderRadius: 20,
          background: '#0f172af5',
          boxShadow: '0 24px 70px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: '#7c3aed',
              fontSize: 28,
            }}
          >
            ✦
          </div>

          <h1 style={{ fontSize: 28, margin: '0 0 10px', fontWeight: 700 }}>
            ยินดีต้อนรับกลับ
          </h1>

          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>
            เข้าสู่ระบบเพื่อใช้งานบัญชีของคุณ
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={labelStyle}>
            อีเมล
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={inputStyle}
          />

          <label htmlFor="password" style={labelStyle}>
            รหัสผ่าน
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="กรอกรหัสผ่านของคุณ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={inputStyle}
          />

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
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {message && (
          <p
            role="status"
            aria-live="polite"
            style={{
              color: success ? '#4ade80' : '#fca5a5',
              fontSize: 14,
              textAlign: 'center',
              lineHeight: 1.7,
              overflowWrap: 'anywhere',
              marginTop: 18,
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            color: '#94a3b8',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          ยังไม่มีบัญชี?{' '}
          <Link
            href="/register"
            style={{
              color: '#c4b5fd',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            สมัครสมาชิก
          </Link>
        </p>
      </section>
    </main>
  );
}
