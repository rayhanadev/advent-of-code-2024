export async function part1(input: string) {
  const lines = input.trim().split("\n");

  const listLeft: number[] = [];
  const listRight: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const [left, right] = lines[i].split("   ").map((n) => Number.parseInt(n));

    listLeft.push(left);
    listRight.push(right);
  }

  listLeft.sort();
  listRight.sort();

  const scalars = listLeft.map((left, i) => listRight[i] - left).map(Math.abs);

  const result = scalars.reduce((acc, val) => acc + val, 0);

  return result;
}
