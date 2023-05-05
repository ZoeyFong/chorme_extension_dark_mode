const rgb2Hex = ([r, g, b]) => {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
};

const hsl2Hex = ([h, s, l]) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const rgba2Hex = ([r, g, b, a]) => {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  if (a.length == 1) a = '0' + a;
  return '#' + r + g + b + a;
};

const isHex = (color) => {
  if (typeof color !== 'string') return false;
  color = color.toLowerCase();
  return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(color);
};

export const isDarkAlready = (color) => {
  let hexcolor = color;
  const factorsArr = color.match(/\d+/g);

  if (/^hsl/i.test(color)) {
    hexcolor = hsl2Hex(factorsArr);
  }
  if (/^rgba/i.test(color)) {
    hexcolor = rgba2Hex(factorsArr);
  } else if (/^rgb/i.test(color)) {
    hexcolor = rgb2Hex(factorsArr);
  }

  if (!isHex(hexcolor)) return false;
  if (/^#[0-9a-fA-f]{8}$/.test(hexcolor) && Number(hexcolor.slice(7)) < 50)
    return false;
  return parseInt(hexcolor.replace('#', ''), 16) < 0xffffff / 2;
};
