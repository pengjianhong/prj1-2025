import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);
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
        const post = await prisma.post.create({
            data: body
        });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
} 