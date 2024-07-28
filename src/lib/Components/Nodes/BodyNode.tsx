import React from "react";

interface IProps {
	children: React.ReactNode;
	className: string;
	style: React.CSSProperties;
}

const BodyNode: React.FC<Partial<IProps>> = ({ children, className = "", style }) => {
	return (
		<div
			className={`flow-ui-node__content ${className}`}
			style={style}
		>
			{children}
		</div>
	);
};

export default BodyNode;
