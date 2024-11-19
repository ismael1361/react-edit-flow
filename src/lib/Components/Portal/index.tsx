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

type position = "top" | "top-left" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "center";

const getOrientation = (position: position) => {
	const vertical = position.search("top") !== -1 ? "top" : position.search("bottom") !== -1 ? "bottom" : "center";
	const horizontal = position.search("left") !== -1 ? "left" : position.search("right") !== -1 ? "right" : "center";
	return { vertical, horizontal } as const;
};

const Portal: React.FC<{
	reference?: HTMLElement | null;
	anchorOrigin?: position;
	transformOrigin?: position;
	children: ReactNode;
	onClosed?: () => void;
	show?: boolean;
}> = ({ reference, anchorOrigin = "bottom-right", transformOrigin = "top-right", onClosed, children, show }) => {
	const mainRef = useRef<HTMLDivElement>(null);

	const getBoundingFragmentRect = (): {
		top: number;
		left: number;
	} => {
		if (!mainRef.current || !reference || !reference.getBoundingClientRect) return { top: 0, left: 0 };

		const refRect = reference.getBoundingClientRect();
		const mainRect = mainRef.current.getBoundingClientRect();
		const pos = { top: 0, left: 0 };

		const anchor = getOrientation(anchorOrigin);
		const transform = getOrientation(transformOrigin);

		switch (anchor.vertical) {
			case "top":
				pos.top = refRect.top;
				break;
			case "bottom":
				pos.top = refRect.bottom;
				break;
			case "center":
				pos.top = refRect.top + refRect.height / 2;
				break;
		}

		switch (transform.vertical) {
			case "bottom":
				pos.top -= mainRect.height;
				break;
			case "center":
				pos.top -= mainRect.height / 2;
				break;
		}

		switch (anchor.horizontal) {
			case "left":
				pos.left = refRect.left;
				break;
			case "right":
				pos.left = refRect.left + refRect.width;
				break;
			case "center":
				pos.left = refRect.left + refRect.width / 2;
				break;
		}

		switch (transform.horizontal) {
			case "right":
				pos.left -= mainRect.width;
				break;
			case "center":
				pos.left -= mainRect.width / 2;
				break;
		}

		return pos;
	};

	useEffect(() => {
		const reposition = () => {
			if (!mainRef.current) return;
			const pos = getBoundingFragmentRect();
			mainRef.current.style.top = `${pos.top}px`;
			mainRef.current.style.left = `${pos.left}px`;
			const margin = 15;

			const { top, left, width, height } = mainRef.current.getBoundingClientRect();

			if (left + width > window.innerWidth) {
				mainRef.current.style.left = `${window.innerWidth - width - margin * 2}px`;
			} else if (left < 0) {
				mainRef.current.style.left = `${margin}px`;
			}

			if (top + height > window.innerHeight) {
				mainRef.current.style.top = `${window.innerHeight - height - margin * 2}px`;
			} else if (top < 0) {
				mainRef.current.style.top = `${margin}px`;
			}

			mainRef.current.style.maxWidth = `${Math.min(400, window.innerWidth - margin * 3)}px`;
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
	anchorOrigin?: position;
	transformOrigin?: position;
}> = ({ items, show, onClosed, reference, anchorOrigin, transformOrigin }) => {
	return (
		<Portal
			show={show}
			reference={reference}
			anchorOrigin={anchorOrigin}
			transformOrigin={transformOrigin}
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
