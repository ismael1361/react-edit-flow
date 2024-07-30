export * from "./AnalyzeJavaScript";

export const uuidv4 = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const cloneValue = <T>(obj: T, seen: Map<any, any> = new Map()): T => {
	// Handle the 3 simple types, and null or undefined
	if (!obj || obj === null || typeof obj !== "object") return obj;

	// Handle Date
	if (obj instanceof Date) {
		return new Date(obj.getTime()) as any;
	}

	// Handle previously seen objects to avoid circular references
	if (seen.has(obj)) {
		return seen.get(obj);
	}

	// Handle Array
	if (obj instanceof Array) {
		const copy: any[] = [];
		seen.set(obj, copy); // Add to seen map
		for (let i = 0, len = obj.length; i < len; i++) {
			copy[i] = cloneValue(obj[i], seen);
		}
		return copy as any;
	}

	// Handle Object
	if (obj instanceof Object) {
		const copy: Record<string, any> = {};
		seen.set(obj, copy); // Add to seen map
		for (let attr in obj as any) {
			copy[attr] = cloneValue((obj as any)[attr], seen);
		}
		return copy as any;
	}

	return obj;
};
