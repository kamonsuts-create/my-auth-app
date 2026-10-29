'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold text-indigo-400">ระบบจัดการข้อมูลส่วนตัว</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-sm font-semibold rounded-lg transition"
          >
            ออกจากระบบ
          </button>
        </div>

        <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <div>
            <p className="text-sm text-gray-400">ชื่อ - นามสกุล</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">รหัสนักศึกษา</p>
            <p className="text-lg font-semibold">6806255</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">อีเมลที่ใช้เข้าสู่ระบบ</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          เชื่อมต่อฐานข้อมูลสำเร็จด้วย TiDB Cloud & Prisma ORM 🚀
        </div>
      </div>
    </div>
  );
}