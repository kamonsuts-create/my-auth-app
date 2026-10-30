import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-between items-center p-6">
      <div className="w-full max-w-4xl pt-10 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">
          Auth System with TiDB Cloud
        </h1>
        <p className="text-slate-400">ระบบจัดการสมาชิก Next.js บน Vercel</p>
      </div>

      <div className="w-full max-w-md my-auto space-y-6 text-center">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-slate-100">กมลสุทธิ์ สาธุสิทธิ์</h2>
          <p className="text-indigo-400 font-mono text-sm mt-1">รหัสนักศึกษา: 6806255</p>
          <p className="text-slate-400 text-xs mt-2">คณะนวัตกรรมดิจิทัลเทคโนโลยี (DIT)</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition">
            เข้าสู่ระบบ
          </Link>
          <Link href="/register" className="px-6 py-2.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
            สมัครสมาชิก
          </Link>
        </div>
      </div>

      <footer className="text-slate-500 text-sm pb-4">
        © 2026 DIT205 Project
      </footer>
    </main>
  );
}