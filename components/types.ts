import { MouseEventHandler, FC, SVGProps, ComponentType, ComponentProps } from "react";

export type icon = ComponentType<ComponentProps<'svg'>>;

export type IconTag = FC<SVGProps<SVGSVGElement>>

export type onClickType = MouseEventHandler<HTMLDivElement>