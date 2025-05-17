function hexToRgb(hex: string) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const int = parseInt(hex, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function mixColors(
  color1: string,
  color2: string,
  weight1: number, // 0–1
) {
  const w1 = Math.max(0, Math.min(1, weight1)); // clamp
  const w2 = 1 - w1;

  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  return rgbToHex({
    r: Math.round(c1.r * w1 + c2.r * w2),
    g: Math.round(c1.g * w1 + c2.g * w2),
    b: Math.round(c1.b * w1 + c2.b * w2),
  });
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const toLinear = (c: number) => {
    c /= 255;
    return c <= 0.03928
      ? c / 12.92
      : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(lum1: number, lum2: number): number {
  const [L1, L2] = [lum1, lum2].sort((a, b) => b - a);
  return (L1 + 0.05) / (L2 + 0.05);
}

export function bestTextColor(bgColor: string): '#000000' | '#FFFFFF' {
  const bgLuminance = getLuminance(bgColor);
  const whiteContrast = getContrastRatio(bgLuminance, getLuminance('#FFFFFF'));
  const blackContrast = getContrastRatio(bgLuminance, getLuminance('#000000'));
  return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
}
