import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        if (req.method === "GET") {
            const users = await prisma.user.findMany({
                include: {
                    posts: true
                }
            });
            res.status(200).json(users);
        }
        if (req.method === "POST") {
            const userData:any = {
            }
            if(req.body.age){
                userData.age = req.body.age;
            } else {
                userData.age = 18;
            }
            if(req.body.posts){
                userData.posts = {
                    create: req.body.posts
                };
            }
            const user = await prisma.user.create({
                data: userData,
            });
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        prisma.$disconnect();
    } finally {
        prisma.$disconnect();
    }
}

