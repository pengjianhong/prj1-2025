import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const user = await prisma.user.create({
            data: body,
            include: {
                posts: true
            }
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
} 