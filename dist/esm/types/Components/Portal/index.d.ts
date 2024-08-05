import React, { ReactNode } from "react";
interface IMenuItem {
    component: ReactNode;
    icon: ReactNode;
    action: () => void;
    disabled?: boolean;
}
declare const Portal: React.FC<{
    reference?: HTMLElement | null;
    position?: "top" | "bottom" | "left" | "right" | "center";
    children: ReactNode;
    onClosed?: () => void;
    show?: boolean;
}>;
export declare const ContextMenu: React.FC<{
    items: IMenuItem[];
    show?: boolean;
    onClosed?: () => void;
    reference?: HTMLElement | null;
    position?: "top" | "bottom" | "left" | "right" | "center";
}>;
export default Portal;
