import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";
import ReactDom from "react-dom";
import { tw } from "../TailwindClasses/Buttons";

const MODAL_STYLES: CSSProperties = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#FFF",
	border: "5px solid rgba(5, 150, 105)",
	borderRadius: "2%",
	padding: "50px",
	zIndex: 1000,
};

const OVERLAY_STYLES: CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, .7)",
	zIndex: 1000,
};

export interface ModalProps {
	open: boolean;
	children: ReactNode;
	onClose: MouseEventHandler<HTMLButtonElement>;
	handleConfirm: string;
}

export default function Modal({
	open,
	children,
	onClose,
	handleConfirm,
}: ModalProps) {
	if (!open) return null;
	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES} />
			<div style={MODAL_STYLES}>
				<div className="text-center p-4">{children}</div>
				<div className="flex justify-between my-3.5">
					<button className={tw.button.white} onClick={onClose}>
						Cancel
					</button>
					<a className={tw.button.white} href={handleConfirm}>
						Confirm
					</a>
				</div>
			</div>
		</>,
		document.getElementById("portal")!
	);
}
