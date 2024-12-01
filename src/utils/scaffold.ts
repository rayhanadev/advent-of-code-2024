import fs from "node:fs/promises";
import { input, select } from "@inquirer/prompts";

export async function scaffold() {
  const day = await input({
    message: "Which day do you want to scaffold a directory for?",
    required: true,
    validate: (input) => {
      const num = Number(input);

      if (Number.isNaN(num)) {
        return "Please enter a number";
      }

      if (num < 1 || num > 25) {
        return "Please enter a number between 1 and 25";
      }

      return true;
    },
  });

  const dayNum = day.padStart(2, "0");
  const dir = `src/day${dayNum}`;

  let overwrite: boolean | null = null;

  if (
    await fs
      .access(dir)
      .then(() => true)
      .catch(() => false)
  ) {
    overwrite = await select({
      message: `Day ${day} already exists. Do you want to overwrite it?`,
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    });
  }

  if (overwrite === true) {
    await fs.rm(dir, { recursive: true });
  }

  if (overwrite === false) {
    console.error(`Day ${day} already exists`);
    process.exit(1);
  }

  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile("src/day00/index.ts", `${dir}/index.ts`);
  await fs.copyFile("src/day00/input.txt", `${dir}/input.txt`);
  await fs.copyFile("src/day00/part1.ts", `${dir}/part1.ts`);
  await fs.copyFile("src/day00/part2.ts", `${dir}/part2.ts`);

  console.log(`Day ${day} scaffolded`);
}
