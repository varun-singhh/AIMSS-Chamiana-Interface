import { randomBytes } from "crypto";

const randomInt = (min, max) => {
  const randomBuffer = randomBytes(4); // 4 bytes is usually enough for generating a random integer
  const randomNumber = randomBuffer.readUInt32LE(0); // Read 4 bytes as an unsigned 32-bit integer
  return min + (randomNumber % (max - min + 1)); // Scale the random number to the desired range
};

export const randomNumber = randomInt(0, 99999); // Generate a random integer between 0 and 99999
