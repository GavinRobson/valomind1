import { Prisma } from "@prisma/client";

export default function JsonifyData(
  input: Prisma.JsonValue
) {
  const data = JSON.stringify(input);
  return JSON.parse(data);
}