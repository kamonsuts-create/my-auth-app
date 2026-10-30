
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // อ่านข้อมูลผู้ใช้ที่เก็บไว้หลัง Login
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser) {
        router.replace('/login');
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (!parsedUser.name || !parsedUser.email) {
        localStorage.removeItem('user');
        router.replace('/login');
        return;
      }

      setUser({
        name: parsedUser.name,
        email: parsedUser.email,
      });
    } catch {
      localStorage.removeItem('user');
      router.replace('/login');
      return;
    }

    setChecking(false);
  }, [router]);

  function handleLogout() {
    // ลบข้อมูลผู้ใช้และ Cookie token
    localStorage.removeItem('user');

    document.cookie =
      'token=; Path=/; Max-Age=0; SameSite=Lax';

    router.replace('/login');
  }

  if (checking || !user) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#f3f4f6',
          fontFamily: 'Arial, sans-serif',
          color: '#374151',
        }}
      >
        กำลังตรวจสอบบัญชี...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        boxSizing: 'border-box',
        background: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        color: '#111827',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 520,
          boxSizing: 'border-box',
          padding: 34,
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
        }}
      >
        <h1
          style={{
            margin: '0 0 24px',
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          Dashboard
        </h1>

        <p style={{ fontSize: 18, margin: '0 0 16px' }}>
          Welcome, {user.name}
        </p>

        <p
          style={{
            fontSize: 18,
            margin: '0 0 24px',
            overflowWrap: 'anywhere',
          }}
        >
          Email: {user.email}
        </p>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: '14px 18px',
            border: 'none',
            borderRadius: 8,
            background: '#0e879b',
            color: '#ffffff',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </section>
    </main>
  );
}
