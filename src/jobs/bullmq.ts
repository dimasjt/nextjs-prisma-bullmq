import { Queue, Worker } from "bullmq";

export const queue = new Queue("postPublisher", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
