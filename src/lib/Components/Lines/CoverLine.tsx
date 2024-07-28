import React, { useContext } from "react";
import { BuilderContext } from "../../Contexts";

interface IProps {
	full?: boolean;
	className?: string;
	style?: any;
}

const CoverLine: React.FC<IProps> = ({ className = "", full }) => {
	const { layout = "vertical", lineColor = "black" } = useContext(BuilderContext);

	const percent = full ? "100%" : "50%";

	return (
		<div
			className={`flow-ui-line__cover ${className}`}
			style={{
				backgroundColor: lineColor,
				width: layout === "vertical" ? percent : "2px",
				height: layout === "vertical" ? "2px" : percent,
			}}
		/>
	);
};

export default CoverLine;
