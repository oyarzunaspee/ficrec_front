import { ReactNode } from "react";
import CardHead from "./CardHead";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { RefObject } from "react";

const Popup = ({ ref, title, body, open, setOpen }: { ref: RefObject<HTMLDivElement | null>, title: string, body?: ReactNode, open: boolean, setOpen: Function }) => {

    return (
        <>
            {open &&
                <>
                    <div className="screen"></div>
                    <div className="popup">
                        <div>
                            <div
                                ref={ref}
                                className="card">
                                <CardHead
                                    title={title}
                                    corner
                                    CornerIcon={XCircleIcon}
                                    cornerClick={() => setOpen(false)}
                                />
                                <div className="card-body">
                                    {body}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Popup;