export async function part1(input: string) {
  const lines = input.trim().split("\n");

  let safeReportsCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const levels = lines[i].split(" ").map(Number);

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

    if (signTest && scalarTest) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}
