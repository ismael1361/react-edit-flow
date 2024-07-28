import { useState } from "react";
import { uuidv4 } from "../Utils";

export const defaultMinZoom = 10;
export const defaultMaxZoom = 200;
export const defaultZoomStep = 10;

export const defaultMaxLength = 10;

export const useId = () => {
	const [id, setId] = useState<string>(uuidv4());
	return id;
};
