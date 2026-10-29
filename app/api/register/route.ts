import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // ตรวจสอบว่ามีอีเมลนี้ในระบบหรือยัง
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้งาน, กรุณาใช้อีเมลอื่น' },
        { status: 400 }
      );
    }

    // บันทึกข้อมูลผู้ใช้ใหม่ (แนะนำให้เข้ารหัส password ในโปรดักชันจริง แต่นี่ทำแบบตรงๆ เพื่อความเรียบง่ายตามโจทย์ครับ)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // ในงานจริงควร hash ด้วย bcrypt
      },
    });

    return NextResponse.json({ message: 'สมัครสมาชิกสำเร็จ!', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดบางอย่าง' }, { status: 500 });
  }
}