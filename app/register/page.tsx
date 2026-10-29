'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'สมัครสมาชิกไม่สำเร็จ');
        return;
      }

      setMessage('สมัครสมาชิกสำเร็จ!');
      setName('');
      setEmail('');
      setPassword('');
    } catch {
      setMessage('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '60px auto', padding: 24 }}>
      <h1>สมัครสมาชิก</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">ชื่อ</label>
        <input id="name" value={name}
          onChange={e => setName(e.target.value)}
          required style={inputStyle} />

        <label htmlFor="email">อีเมล</label>
        <input id="email" type="email" value={email}
          onChange={e => setEmail(e.target.value)}
          required style={inputStyle} />

        <label htmlFor="password">รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)</label>
        <input id="password" type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={8} required style={inputStyle} />

        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: 12, marginTop: 12 }}>
          {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
        </button>
      </form>

      <p role="status">{message}</p>
      <p>มีบัญชีแล้ว? <a href="/login">เข้าสู่ระบบ</a></p>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  padding: 10,
  marginTop: 6,
  marginBottom: 16,
};
