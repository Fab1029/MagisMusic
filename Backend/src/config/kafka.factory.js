import kafka from "./kafka.config.js";

// Cada jam o usuario puede tener su propio consumer o producer
export function createConsumer(groupId) {
  return kafka.consumer({ groupId });
}

export function createProducer() {
  return kafka.producer();
}
