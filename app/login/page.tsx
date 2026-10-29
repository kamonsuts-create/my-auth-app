import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ค้นหาผู้ใช้จากอีเมล
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'เข้าสู่ระบบสำเร็จ!', user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดบางอย่าง' }, { status: 500 });
  }
}