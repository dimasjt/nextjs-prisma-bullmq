import { Worker } from "bullmq";
import createPrisma from "../src/models/prisma";

export const worker = new Worker(
  "postPublisher",
  async (job) => {
    const prisma = createPrisma();

    prisma.post.update({
      where: {
        id: job.data.postId,
      },
      data: {
        published: true,
      },
    });
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);
