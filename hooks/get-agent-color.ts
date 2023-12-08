import * as data from "@/characters.json";

export default function getAgentColor() {
  const colors = JSON.stringify(data);
  return JSON.parse(colors);
}
