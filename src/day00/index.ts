import input from "./input.txt" with { type: "text" };

import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

export default function (part: number) {
  return part === 1 ? part1(input) : part2(input);
}
