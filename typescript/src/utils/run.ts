import { input, select } from "@inquirer/prompts";

export async function run(initialDay?: string) {
  const day = initialDay
    ? initialDay
    : await input({
        message: "Which day do you want to run?",
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

  const { default: dayFn } = await import(`../day${day.padStart(2, "0")}`);

  if (typeof dayFn !== "function") {
    console.error(`Day ${day} not implemented yet`);
    process.exit(1);
  }

  const part = await select({
    message: "Which part do you want to run?",
    choices: [
      { name: "Part 1", value: 1 },
      { name: "Part 2", value: 2 },
    ],
  });

  const result = await dayFn(part);
  console.log(result);
}
