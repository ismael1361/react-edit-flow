import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import "./style.scss";

interface TextareaFieldProps {
	style: React.CSSProperties;
}

const getSelectionIndicesInDiv = (
	div?: HTMLDivElement | null,
): {
	selectionStart: number;
	selectionEnd: number;
	x: number;
	y: number;
	range?: Range;
	selection?: Selection;
	direction: "START" | "END";
} => {
	const selection = window.getSelection();

	if (!selection || !div) {
		return { selectionStart: -1, selectionEnd: -1, x: 0, y: 0, direction: "END" };
	}

	console.log(selection);

	const range = selection.getRangeAt(0); // O intervalo da seleção

	// Garantir que a seleção está dentro da div
	if (!div.contains(range.commonAncestorContainer)) {
		return { selectionStart: -1, selectionEnd: -1, x: 0, y: 0, direction: "END" };
	}

	let preSelectionRange = document.createRange();
	preSelectionRange.setStart(div, 0); // Começar do início da div
	preSelectionRange.setEnd(range.startContainer, range.startOffset); // Fim no início da seleção

	// O selectionStart é o comprimento da string até o início da seleção
	const selectionStart = preSelectionRange.toString().length;

	// O selectionEnd é o selectionStart + o comprimento da seleção
	const selectionEnd = selectionStart + range.toString().length;

	const { x: relativeX, y: relativeY } = getPosRange(div, range);

	const direction: "START" | "END" = selection.anchorOffset < selection.focusOffset ? "START" : "END";

	return { selectionStart, selectionEnd, x: relativeX, y: relativeY, range, selection, direction };
};

const getPosRange = (
	div?: HTMLDivElement | null,
	range?: Range | null,
): {
	x: number;
	y: number;
	width: number;
	height: number;
} => {
	if (!div || !range) {
		return { x: 0, y: 0, width: 0, height: 0 };
	}

	// Obter as coordenadas (x, y) do intervalo da seleção
	const rangeRect = range.getBoundingClientRect();

	// Obter as coordenadas da div
	const divRect = div.getBoundingClientRect();

	// Calcular a posição relativa ao scroll da div
	const relativeX = rangeRect.left - divRect.left + div.scrollLeft;
	const relativeY = rangeRect.top - divRect.top + div.scrollTop;

	return { x: relativeX, y: relativeY, width: rangeRect.width, height: rangeRect.height };
};

const defaultCursor: ReturnType<typeof getSelectionIndicesInDiv> = {
	selectionStart: -1,
	selectionEnd: -1,
	x: 0,
	y: 0,
	range: undefined,
	direction: "END",
};

const getNextElement = (node: Node): HTMLElement | null => {
	// Pega o próximo nó irmão
	let nextNode: Node | null = node.nextSibling;

	// Verifica se o próximo nó é um elemento de tipo HTMLElement
	while (nextNode) {
		if (nextNode.nodeType === Node.ELEMENT_NODE) {
			return nextNode as HTMLElement; // Cast para HTMLElement
		}
		nextNode = nextNode.nextSibling;
	}

	return null;
};

const TextareaField: React.FC<Partial<TextareaFieldProps>> = ({ ...props }) => {
	const [cursor, setCursor] = useState<ReturnType<typeof getSelectionIndicesInDiv>>(defaultCursor);
	const mainRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!mainRef.current) {
			return;
		}

		let currentCursor = cursor;

		const updateCursor = () => {
			currentCursor = getSelectionIndicesInDiv(mainRef.current);
			setCursor(currentCursor);
		};

		const initialize = () => {
			setCursor(defaultCursor);
		};

		const onFocus = () => {};

		const onUnfocus = () => {
			initialize();
		};

		const onMouseDown = () => {
			initialize();
		};

		const onMouseUp = () => {
			if (!mainRef.current) {
				initialize();
				return;
			}

			updateCursor();

			console.log(currentCursor.range);
		};

		const keyPress = (e: KeyboardEvent) => {
			e.preventDefault();
			e.stopPropagation();

			if (!currentCursor.range) {
				return;
			}

			const toCursor = (pos: number) => {
				console.log(currentCursor.direction);

				if (!currentCursor.range || !currentCursor.selection) {
					return;
				}

				const { selection } = currentCursor;

				// selection.setPosition(selection.focusNode, selection.focusOffset + pos);

				switch (currentCursor.direction) {
					case "END": {
						if (e.shiftKey) {
							selection.setBaseAndExtent(currentCursor.range.startContainer, currentCursor.range.startOffset + pos, currentCursor.range.endContainer, currentCursor.range.endOffset);
						} else {
							selection.setPosition(currentCursor.range.endContainer, currentCursor.range.endOffset + pos);
						}
						break;
					}
					case "START": {
						if (e.shiftKey) {
							selection.setBaseAndExtent(currentCursor.range.endContainer, currentCursor.range.endOffset + pos, currentCursor.range.startContainer, currentCursor.range.startOffset);
						} else {
							selection.setPosition(currentCursor.range.endContainer, currentCursor.range.endOffset + pos);
						}
						break;
					}
				}
			};

			switch (e.key) {
				case "ArrowLeft": {
					toCursor(-1);
					break;
				}
				case "ArrowRight": {
					toCursor(1);
					break;
				}
			}

			updateCursor();
		};

		mainRef.current.addEventListener("focus", onFocus);
		mainRef.current.addEventListener("blur", onUnfocus);

		mainRef.current.addEventListener("mousedown", onMouseDown);
		mainRef.current.addEventListener("mouseup", onMouseUp);

		mainRef.current.addEventListener("keydown", keyPress);

		return () => {
			mainRef.current?.removeEventListener("focus", onFocus);
			mainRef.current?.removeEventListener("blur", onUnfocus);

			mainRef.current?.removeEventListener("mousedown", onMouseDown);
			mainRef.current?.removeEventListener("mouseup", onMouseUp);

			mainRef.current?.removeEventListener("keydown", keyPress);
		};
	}, [mainRef.current]);

	const cursorPos = getPosRange(mainRef.current, cursor.range);

	return (
		<div
			{...props}
			className={"TextareaField"}
			ref={mainRef}
			tabIndex={1}
		>
			<div className={"main"}>
				<span style={{ fontWeight: "bold" }}>Lorem Ipsum</span>
				<span>
					{" "}
					is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled
				</span>
				<div
					style={{
						backgroundColor: "red",
						height: "15px",
						width: "25px",
					}}
				></div>
				<span>
					{" "}
					it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
					1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
					Ipsum.
				</span>
				<br />
				<span style={{ fontWeight: "bold" }}>Lorem Ipsum</span>
				<span>
					{" "}
					is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
					was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
					versions of Lorem Ipsum.
				</span>
			</div>
			{cursor.range && cursor.selectionStart === cursor.selectionEnd && (
				<div
					className={"cursor"}
					style={{
						top: `${cursorPos.y}px`,
						left: `${cursorPos.x}px`,
						height: `${cursorPos.height}px`,
					}}
				></div>
			)}
		</div>
	);
};

export default TextareaField;
