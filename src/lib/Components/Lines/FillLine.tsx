import React, { useContext } from "react";
import { BuilderContext } from "../../Contexts";

interface IProps {}

const FillLine: React.FC<IProps> = ({}) => {
	const { layout, lineColor, spaceX, spaceY } = useContext(BuilderContext);

	return (
		<div
			className="flow-ui-line__fill"
			style={{
				backgroundColor: lineColor,
				width: layout === "vertical" ? "2px" : "100%",
				minWidth: layout === "vertical" ? "auto" : `${spaceX}px`,
				height: layout === "vertical" ? "100%" : "2px",
				minHeight: layout === "vertical" ? `${spaceY}px` : "auto",
			}}
		/>
	);
};

export default FillLine;
