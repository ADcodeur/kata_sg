export function getDate(timestamp: number): string {
  return new Date(timestamp * 1000).toUTCString();
}
