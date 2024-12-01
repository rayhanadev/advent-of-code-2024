export async function part2(input: string) {
  const lines = input.trim().split("\n");

  const listLeft: number[] = [];
  const listRight: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const [left, right] = lines[i].split("   ").map((n) => Number.parseInt(n));

    listLeft.push(left);
    listRight.push(right);
  }

  const cache: Record<string, number> = {};

  const indexes: number[] = [];

  for (let i = 0; i < listLeft.length; i++) {
    const left = listLeft[i];
    const key = left.toString();

    if (cache[key] !== undefined) {
      indexes.push(cache[key]);
      continue;
    }

    const count = listRight.filter((right) => left === right).length;
    const computedIndex = left * count;

    cache[key] = computedIndex;
    indexes.push(computedIndex);
  }

  const result = indexes.reduce((acc, curr) => acc + curr, 0);

  return result;
}
