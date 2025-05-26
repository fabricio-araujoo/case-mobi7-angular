export function parseToHours(time: string): number {
  const match = time.match(/(\d+)h\s+(\d+)min/);

  if (!match) {
    return 0;
  }

  const [, h, m] = match.map(Number);

  return h + m / 60;
}
