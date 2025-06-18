import { IconTag, onClickType } from "./types";

type CardHeadProps = {
    onClick?: onClickType;
    title: string;
    subTitle?: string;
    cornerClick?: onClickType;
    corner?: boolean;
    CornerIcon?: IconTag;
}

function CardHead({ onClick, title, subTitle, cornerClick, corner, CornerIcon }: CardHeadProps) {

    return (
        <>
            <div
                onClick={onClick}
                className="card-head">
                <div className={`title 
                ${!CornerIcon && "flex justify-center"}
                `}>
                    <span>
                        {title}
                    </span>
                    {subTitle &&
                        subTitle
                    }
                </div>
                {CornerIcon &&

                    <div
                        onClick={cornerClick}
                        className={`corner 
                ${!corner && "lg:hidden"}`}>
                        <CornerIcon className="icon" />
                    </div>
                }
            </div>
        </>
    )

}

export default CardHead;