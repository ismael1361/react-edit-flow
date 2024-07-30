import React, { useContext } from "react";
import { BuilderContext } from "../../Contexts";

interface IProps {
	className?: string;
	style?: any;
	minSpace?: number;
}

const SplitLine: React.FC<IProps> = ({ className = "", style, minSpace = 0 }) => {
	const { layout, lineColor, spaceX, spaceY } = useContext(BuilderContext);

	return (
		<div
			className={`flow-ui-line__split ${className}`}
			style={{
				backgroundColor: lineColor,
				width: `${layout === "vertical" ? 2 : Math.max(minSpace, spaceX)}px`,
				minWidth: `${layout === "vertical" ? 2 : Math.max(minSpace, spaceX)}px`,
				height: `${layout === "vertical" ? Math.max(minSpace, spaceY) : 2}px`,
				minHeight: `${layout === "vertical" ? Math.max(minSpace, spaceY) : 2}px`,
				...style,
			}}
		/>
	);
};

export default SplitLine;
