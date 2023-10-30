import { NextApiRequest, NextApiResponse } from "next";
import createPrisma from "../../../models/prisma";
import { queue } from "../../../jobs/bullmq";

const prisma = createPrisma();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();

    return res.status(200).json({
      data: posts,
    });
  } else if (req.method === "POST") {
    const { title, content, publishedAt } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        publishedAt,
      },
    });

    queue.add(
      "postPublisher",
      {
        postId: post.id,
      },
      {
        delay: post.publishedAt.getTime() - Date.now(),
      }
    );

    return res.status(201).json({
      data: post,
    });
  }
}
