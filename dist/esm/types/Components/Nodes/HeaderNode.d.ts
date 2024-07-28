import React, { ReactNode } from "react";
interface IProps {
    icon?: ReactNode;
    children?: ReactNode;
    color?: string;
    actions?: Array<Partial<{
        label: string;
        icon: ReactNode;
        action: () => void;
    }>>;
    onClick?: () => void;
}
declare const HeaderNode: React.FC<Partial<IProps>>;
export default HeaderNode;
