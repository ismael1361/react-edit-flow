import React, { useContext } from "react";
import { BuilderContext } from "../../Contexts";

interface IProps {}

const FillLine: React.FC<IProps> = ({}) => {
	const { layout, lineColor } = useContext(BuilderContext);

	return (
		<div
			className="flow-ui-line__fill"
			style={{
				backgroundColor: lineColor,
				width: layout === "vertical" ? "2px" : "100%",
				height: layout === "vertical" ? "100%" : "2px",
			}}
		/>
	);
};

export default FillLine;
