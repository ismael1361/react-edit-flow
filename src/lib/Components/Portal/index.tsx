import { mdiCircle } from "@mdi/js";
import Icon from "@mdi/react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IMenuItem {
	component: ReactNode;
	icon: ReactNode;
	action: () => void;
	disabled?: boolean;
}

const Portal: React.FC<{
	reference?: HTMLElement | null;
	position?: "top" | "bottom" | "left" | "right" | "center";
	children: ReactNode;
	onClosed?: () => void;
	show?: boolean;
}> = ({ reference, position = "bottom", onClosed, children, show }) => {
	const mainRef = useRef<HTMLDivElement>(null);

	const getBoundingFragmentRect = (): {
		top: number;
		left: number;
		width: number;
		height: number;
	} => {
		if (!reference || !reference.getBoundingClientRect) return { top: 0, left: 0, width: 0, height: 0 };

		let { top, left, width, height } = reference.getBoundingClientRect();

		if (position === "top") {
			top = top;
			left = left + width / 2;
		} else if (position === "bottom") {
			top = top + height;
			left = left + width / 2;
		} else if (position === "left") {
			top = top + height / 2;
			left = left;
		} else if (position === "right") {
			top = top + height / 2;
			left = left + width;
		} else if (position === "center") {
			top = top + height / 2;
			left = left + width / 2;
		}
		return {
			top,
			left,
			width,
			height,
		};
	};

	useEffect(() => {
		const reposition = () => {
			if (!mainRef.current) return;
			const pos = getBoundingFragmentRect();
			mainRef.current.style.top = `${pos.top}px`;
			mainRef.current.style.left = `${pos.left}px`;

			const { top, left, width, height } = mainRef.current.getBoundingClientRect();

			if (left + width > window.innerWidth) {
				mainRef.current.style.left = `${window.innerWidth - width - 15}px`;
			} else if (left < 0) {
				mainRef.current.style.left = "15px";
			}

			if (top + height > window.innerHeight) {
				mainRef.current.style.top = `${window.innerHeight - height - 15}px`;
			} else if (top < 0) {
				mainRef.current.style.top = "15px";
			}
		};

		const downOutside = (e: MouseEvent) => {
			if (mainRef.current && !mainRef.current.contains(e.target as Node)) {
				document.removeEventListener("mousedown", downOutside);
				onClosed?.();
				return;
			}
			reposition();
		};

		document.addEventListener("mousedown", downOutside);
		window.addEventListener("scroll", reposition);
		window.addEventListener("resize", reposition);

		reposition();

		return () => {
			document.removeEventListener("mousedown", downOutside);
			window.removeEventListener("scroll", reposition);
			window.removeEventListener("resize", reposition);
		};
	}, [show, reference, mainRef.current]);

	const { top, left } = getBoundingFragmentRect();

	return (
		<>
			{show &&
				createPortal(
					<Paper
						ref={mainRef}
						sx={{
							position: "fixed",
							top: top,
							left: left,
							zIndex: 9999,
							width: "max-content",
							minWidth: 200,
							maxWidth: 400,
							overflow: "hidden",
						}}
						elevation={5}
					>
						{children}
					</Paper>,
					document.body,
				)}
		</>
	);
};

export const ContextMenu: React.FC<{
	items: IMenuItem[];
	show?: boolean;
	onClosed?: () => void;
	reference?: HTMLElement | null;
	position?: "top" | "bottom" | "left" | "right" | "center";
}> = ({ items, show, onClosed, reference, position = "bottom" }) => {
	return (
		<Portal
			show={show}
			reference={reference}
			position={position}
			onClosed={onClosed}
		>
			<List
				sx={{
					width: "100%",
				}}
			>
				{items.map((item, i, self) => (
					<ListItem
						key={i}
						onMouseDown={(e) => {
							e.preventDefault();
							if (item.disabled) {
								return;
							}
							item?.action();
							onClosed?.();
						}}
						disablePadding
					>
						<ListItemButton
							sx={{ py: 0, minHeight: 32 }}
							disabled={item.disabled}
						>
							{item.icon && (
								<ListItemIcon sx={{ minWidth: 35 }}>
									{typeof item.icon !== "string" ? (
										item.icon
									) : (
										<Icon
											path={typeof item.icon === "string" ? item.icon : mdiCircle}
											size={"25px"}
										/>
									)}
								</ListItemIcon>
							)}
							<ListItemText
								primary={item.component}
								primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Portal>
	);
};

export default Portal;
