import React, { ReactNode } from "react";
import Icon from "@mdi/react";
import { mdiCircle, mdiPuzzle } from "@mdi/js";

interface IProps {
	icon?: ReactNode;
	children?: ReactNode;
	color?: string;
	actions?: Array<
		Partial<{
			label: string;
			icon: ReactNode;
			action: () => void;
		}>
	>;
	onClick?: () => void;
}

const HeaderNode: React.FC<Partial<IProps>> = ({ children, icon, color = "#757575", actions = [], onClick }) => {
	return (
		<div className="flow-ui-node__header">
			<div
				className="flow-ui-node__header__background"
				style={{
					backgroundColor: color,
				}}
			></div>
			<div
				className="flow-ui-node__header__content"
				onClick={onClick}
				style={{
					cursor: onClick ? "pointer" : undefined,
				}}
			>
				<div
					className="flow-ui-node__header__icon"
					style={{
						backgroundColor: color,
					}}
				>
					{icon && typeof icon !== "string" ? icon : <Icon path={typeof icon === "string" ? icon : mdiPuzzle} />}
				</div>
				<div className="flow-ui-node__header__title">{children}</div>
			</div>
			{actions.map(({ action, icon, label }, index) => {
				return (
					<div
						key={index}
						className="flow-ui-node__header__action"
						onClick={action}
						title={label}
					>
						{icon && typeof icon !== "string" ? icon : <Icon path={typeof icon === "string" ? icon : mdiCircle} />}
					</div>
				);
			})}
		</div>
	);
};

export default HeaderNode;
