const createHSLString = ([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`;

const convertFromHEXToHSL = (hex = "", options = {}) => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 4) {
    r = `0x${hex[1]}${hex[1]}`;
    g = `0x${hex[2]}${hex[2]}`;
    b = `0x${hex[3]}${hex[3]}`;
  } else if (hex.length === 7) {
    r = `0x${hex[1]}${hex[2]}`;
    g = `0x${hex[3]}${hex[4]}`;
    b = `0x${hex[5]}${hex[6]}`;
  }

  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h;
  let s;
  let l;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  const isDarken = 0.2126 * r + 0.7152 * g + 0.0722 * b <= 0.647;

  const hslArray = [
    options.hue ?? h,
    options.saturation ?? s,
    options.lightness ?? l,
  ];

  return {
    hslArray,
    hslString: createHSLString(hslArray),
    isDarken,
  };
};

export { convertFromHEXToHSL, createHSLString };
