import React, { useContext } from "react";
import { BuilderContext } from "../../Contexts";

interface IProps {
	className?: string;
	style?: any;
}

const SplitLine: React.FC<IProps> = ({ className = "", style }) => {
	const { layout, lineColor, spaceX, spaceY } = useContext(BuilderContext);

	return (
		<div
			className={`flow-ui-line__split ${className}`}
			style={{
				backgroundColor: lineColor,
				width: `${layout === "vertical" ? 2 : spaceX}px`,
				minWidth: `${layout === "vertical" ? 2 : spaceX}px`,
				height: `${layout === "vertical" ? spaceY : 2}px`,
				minHeight: `${layout === "vertical" ? spaceY : 2}px`,
				...style,
			}}
		/>
	);
};

export default SplitLine;
