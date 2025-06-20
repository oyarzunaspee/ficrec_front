import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { useToggleCollectionMutation } from "../../../../../store/api/profile";
import { updateQuery } from "../../../../../store/slices/query";
import { useOutsideClick } from "../../../../../utils/outsideClick";
import useColor from "../../../../../utils/colors";

import { ArrowPathIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";


const Filter = () => {
    const dispatch = useAppDispatch()
    const query = useAppSelector((state) => state.query.value);

    return (
        <>
            <div className="form-group flex items-center px-5 mt-5">
                <input
                    value={query}
                    onChange={(e) => dispatch(updateQuery(e.target.value))}
                    type="text" className="rounded-full placeholder:text-dull px-5 mr-1 lg:z-10" placeholder="filter" />
                <Toggle />
            </div>
        </>
    )
}

const Toggle = () => {
    const { routeParams } = usePageContext();
    const highlight = useColor()

    const collectionDisplay = useAppSelector((state) => state.collectionDisplay.value);

    const [open, setOpen] = useState<boolean>(false);

    const optionals = Object.keys(collectionDisplay);

    const [useToggleCollection, result] = useToggleCollectionMutation();
    const performToggleCollection = async (toggle: string) => {
        await useToggleCollection({ uid: routeParams.collection, data: { toggle: toggle } })
            .unwrap()
            .then(() => {
            })
    }

    const ref = useOutsideClick(() => {
        setOpen(false);
    });

    return (
        <>
            <div className="lg:relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="py-2 pl-4 cursor-pointer">
                    {result.isLoading ?
                        <ArrowPathIcon className={`size-8 animate-spin
                        ${highlight.text}
                        `}
                        />
                        :
                        <AdjustmentsHorizontalIcon className={`size-8
                        ${open ? highlight.text : "text-secondary"}    
                        `} />
                    }
                </div>
                <div ref={ref} className={`absolute z-20 right-0 top-10 overflow-hidden
                    transition-height duration-200 ease-in-out
                    ${open ? "max-h-90" : "max-h-0"}
                    `}>
                    <ul className="py-3 px-5 bg-white border rounded-md border-base">
                        {optionals.map((item) => {
                            return (
                                <li key={item} className="flex flex-col">
                                    <div className="flex">
                                        <label htmlFor={item.toLowerCase()} 
                                        className="mb-2 text-sm align-middle flex items-center font-medium"
                                        >
                                            <input
                                                onChange={() => performToggleCollection(item)}
                                                checked={collectionDisplay[item as keyof typeof collectionDisplay] ? true : false}
                                                type="checkbox" name={item} 
                                                className={`mr-2 ${highlight.accent}`} 
                                                />

                                            {item}
                                        </label>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Filter;