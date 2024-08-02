let hsvSaturation = 0.45;

export function getHsvSaturation(): number {
	return hsvSaturation;
}

export function setHsvSaturation(newSaturation: number) {
	hsvSaturation = newSaturation;
}

let hsvValue = 0.65;

export function getHsvValue(): number {
	return hsvValue;
}

export function setHsvValue(newValue: number) {
	hsvValue = newValue;
}

export const colourNames: { [key: string]: string } = {
	aqua: "#00ffff",
	black: "#000000",
	blue: "#0000ff",
	fuchsia: "#ff00ff",
	gray: "#808080",
	green: "#008000",
	lime: "#00ff00",
	maroon: "#800000",
	navy: "#000080",
	olive: "#808000",
	purple: "#800080",
	red: "#ff0000",
	silver: "#c0c0c0",
	teal: "#008080",
	white: "#ffffff",
	yellow: "#ffff00",
};

export function parse(str: string | number): string | null {
	str = `${str}`.toLowerCase().trim();
	let hex = colourNames[str];
	if (hex) {
		// e.g. 'red'
		return hex;
	}
	hex = str.substring(0, 2) === "0x" ? "#" + str.substring(2) : str;
	hex = hex[0] === "#" ? hex : "#" + hex;
	if (/^#[0-9a-f]{6}$/.test(hex)) {
		// e.g. '#00ff88'
		return hex;
	}
	if (/^#[0-9a-f]{3}$/.test(hex)) {
		// e.g. '#0f8'
		return ["#", hex[1], hex[1], hex[2], hex[2], hex[3], hex[3]].join("");
	}
	const rgb = str.match(/^(?:rgb)?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
	if (rgb) {
		// e.g. 'rgb(0, 128, 255)'
		const r = Number(rgb[1]);
		const g = Number(rgb[2]);
		const b = Number(rgb[3]);
		if (r >= 0 && r < 256 && g >= 0 && g < 256 && b >= 0 && b < 256) {
			return rgbToHex(r, g, b);
		}
	}
	return null;
}

export function rgbToHex(r: number, g: number, b: number): string {
	const rgb = (r << 16) | (g << 8) | b;
	if (r < 0x10) {
		return "#" + (0x1000000 | rgb).toString(16).substr(1);
	}
	return "#" + rgb.toString(16);
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const delta = max - min;
	let h = 0;
	let s = 0;
	const v = max;
	if (max !== 0) {
		s = delta / max;
		if (red === max) {
			h = (green - blue) / delta;
		} else if (green === max) {
			h = 2 + (blue - red) / delta;
		} else {
			h = 4 + (red - green) / delta;
		}
		h *= 60;
		if (h < 0) {
			h += 360;
		}
	}
	return { h, s, v };
}

export function hexToRgb(colour: string): { r: number; g: number; b: number } {
	const hex = parse(colour);
	if (!hex) {
		return { r: 0, g: 0, b: 0 };
	}

	const rgb = parseInt(hex.substr(1), 16);
	const r = rgb >> 16;
	const g = (rgb >> 8) & 255;
	const b = rgb & 255;

	return { r, g, b };
}

export function hsvToHex(h: number, s: number, v: number): string {
	let red = 0;
	let green = 0;
	let blue = 0;
	if (s === 0) {
		red = v;
		green = v;
		blue = v;
	} else {
		const sextant = Math.floor(h / 60);
		const remainder = h / 60 - sextant;
		const val1 = v * (1 - s);
		const val2 = v * (1 - s * remainder);
		const val3 = v * (1 - s * (1 - remainder));
		switch (sextant) {
			case 1:
				red = val2;
				green = v;
				blue = val1;
				break;
			case 2:
				red = val1;
				green = v;
				blue = val3;
				break;
			case 3:
				red = val1;
				green = val2;
				blue = v;
				break;
			case 4:
				red = val3;
				green = val1;
				blue = v;
				break;
			case 5:
				red = v;
				green = val1;
				blue = val2;
				break;
			case 6:
			case 0:
				red = v;
				green = val3;
				blue = val1;
				break;
		}
	}
	return rgbToHex(Math.floor(red), Math.floor(green), Math.floor(blue));
}

export function parseBlockColour(colour: number | string = 240): {
	hue: number | null;
	hex: string;
} {
	if (typeof colour === "string") {
		if (/^rgb\((\d+), (\d+), (\d+)\)$/.test(colour)) {
			const [_, r, g, b] = colour.match(/rgb\((\d+), (\d+), (\d+)\)/) || [];

			return {
				hue: rgbToHsv(parseInt(r), parseInt(g), parseInt(b)).h,
				hex: rgbToHex(parseInt(r), parseInt(g), parseInt(b)),
			};
		} else {
			const { r, g, b } = hexToRgb(colour);

			return {
				hue: rgbToHsv(r, g, b).h,
				hex: colour,
			};
		}
	}

	colour = typeof colour === "string" ? parseInt(colour) : colour;

	return {
		hue: colour,
		hex: hsvToHex(colour / 360, getHsvSaturation(), getHsvValue() * 255),
	};
}
