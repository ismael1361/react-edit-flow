import React, { ReactNode, useContext } from "react";
import Icon from "@mdi/react";
import { mdiAlert, mdiAlertCircle, mdiAlertCircleOutline, mdiAlertOctagon, mdiCircle, mdiDotsHorizontal, mdiPuzzle } from "@mdi/js";
import Portal, { ContextMenu } from "../Portal";
import { NodeLogsContext } from "../../Contexts";
import { Alert } from "@mui/material";

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
	tools?: Array<{
		label: string;
		icon: ReactNode;
		action: () => void;
		disabled?: boolean;
	}>;
	onClick?: () => void;
}

const HeaderNode: React.FC<Partial<IProps>> = ({ children, icon, color = "#757575", actions = [], tools = [], onClick }) => {
	const logRef = React.useRef<HTMLDivElement | null>(null);
	const toolsRef = React.useRef<HTMLDivElement | null>(null);
	const [showLogs, setShowLogs] = React.useState<boolean>(false);
	const [showTools, setShowTools] = React.useState<boolean>(false);
	const { logs } = useContext(NodeLogsContext);

	const typeLog = logs.findIndex((log) => log.type === "error") !== -1 ? "error" : logs.findIndex((log) => log.type === "warning") !== -1 ? "warning" : "info";

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
			{logs.length > 0 && (
				<div
					className="flow-ui-node__header__action"
					onClick={() => {
						setShowLogs(true);
					}}
					title={"Logs"}
					ref={logRef}
				>
					<Icon
						path={typeLog === "error" ? mdiAlertOctagon : typeLog === "warning" ? mdiAlert : mdiAlertCircleOutline}
						size={1}
						color={typeLog === "error" ? "#c62828" : typeLog === "warning" ? "#e65100" : "rgba(0, 0, 0, .6)"}
					/>
				</div>
			)}
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
			{tools.length > 0 && (
				<>
					<div
						className="flow-ui-node__header__action"
						ref={toolsRef}
						onClick={() => {
							setShowTools(true);
						}}
					>
						<Icon path={mdiDotsHorizontal} />
					</div>
					<ContextMenu
						show={showTools}
						onClosed={() => {
							setShowTools(false);
						}}
						items={tools.map((item) => {
							return {
								...item,
								component: item.label,
							};
						})}
						reference={toolsRef.current}
					/>
				</>
			)}
			<Portal
				show={showLogs}
				reference={logRef.current}
				onClosed={() => {
					setShowLogs(false);
				}}
			>
				{logs.map(({ message, type }, i) => {
					return (
						<Alert
							key={i}
							severity={type}
							style={{
								borderTop: i !== 0 ? "1px solid rgba(0, 0, 0, .1)" : undefined,
								borderRadius: 0,
							}}
						>
							{message}
						</Alert>
					);
				})}
			</Portal>
		</div>
	);
};

export default HeaderNode;
