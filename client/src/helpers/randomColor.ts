export default function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.random() * 10;
  const lightness = 85 + Math.random() * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
