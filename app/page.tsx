'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'เกิดข้อผิดพลาด');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">สมัครสมาชิก (Register)</h2>
        {error && <p className="mb-4 text-red-400 text-sm text-center bg-red-900/30 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition duration-200"
          >
            ยืนยันการสมัครสมาชิก
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          มีบัญชีอยู่แล้ว?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline">
            เข้าสู่ระบบที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}