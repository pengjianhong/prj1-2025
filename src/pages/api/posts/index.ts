import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        if (req.method === "GET") {
            const posts = await prisma.post.findMany();
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        prisma.$disconnect();
    } finally {
        prisma.$disconnect();
    }
}

