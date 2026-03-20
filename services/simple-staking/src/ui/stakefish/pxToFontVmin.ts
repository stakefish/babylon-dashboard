export const pxToFontVmin = (px: number, min?: number, max?: number) => {
  const vminValue = (Math.abs(16 - px) / 1680) * 100;
  return `clamp(${min || px * 0.9}px, calc(1rem + ${vminValue}vmin), ${max || px}px)`;
};
