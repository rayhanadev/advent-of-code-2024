export async function part2(input: string) {
  const lines = input.trim().split("\n");

  let safeReportsCount = 0;

  for (const line of lines) {
    const levels = line.split(" ").map(Number);

    if (isSafe(levels)) {
      safeReportsCount++;
      continue;
    }

    let canBeMadeSafe = false;

    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafe(modifiedLevels)) {
        canBeMadeSafe = true;
        break;
      }
    }

    if (canBeMadeSafe) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}

function isSafe(levels: number[]) {
  const firstLevel = levels[0];
  const secondLevel = levels[1];
  let state: "asc" | "desc" | null = null;

  if (firstLevel < secondLevel) {
    state = "asc";
  } else if (firstLevel > secondLevel) {
    state = "desc";
  }

  const signTest = levels.every((level, i) => {
    if (i === 0) {
      return true;
    }
    if (state === "asc") {
      return level >= levels[i - 1];
    }
    if (state === "desc") {
      return level <= levels[i - 1];
    }
    return false;
  });

  const scalarTest = levels
    .map((level, i) => (i === 0 ? 1 : Math.abs(level - levels[i - 1])))
    .every((scalar) => scalar > 0 && scalar <= 3);

  return signTest && scalarTest;
}
