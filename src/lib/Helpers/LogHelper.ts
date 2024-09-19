export class LogHelper extends Array<{
	type: "error" | "warning" | "info";
	message: string;
}> {
	constructor() {
		super();
	}

	info(message: string) {
		this.push({
			type: "info",
			message,
		});
	}

	warning(message: string) {
		this.push({
			type: "warning",
			message,
		});
	}

	error(message: string) {
		this.push({
			type: "error",
			message,
		});
	}
}
