export function parseStringToHours(time: string): number {
  const match = time.match(/(\d+)h\s+(\d+)min/);

  if (!match) {
    return 0;
  }

  const [, h, m] = match.map(Number);

  return h + m / 60;
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}
