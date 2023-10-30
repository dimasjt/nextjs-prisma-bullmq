import Arena from "bull-arena";
import { Queue } from "bullmq";

function main() {
  const arena = Arena({
    BullMQ: Queue,
    queues: [
      {
        name: "postPublisher",
        hostId: "worker",
        type: "bullmq",
        redis: {
          host: "localhost",
          port: 6379,
        },
      },
    ],
  });
}

main();
