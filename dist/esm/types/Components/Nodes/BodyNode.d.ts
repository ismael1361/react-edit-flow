import React from "react";
interface IProps {
    children: React.ReactNode;
    className: string;
    style: React.CSSProperties;
}
declare const BodyNode: React.FC<Partial<IProps>>;
export default BodyNode;
