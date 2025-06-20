import { UseFormRegisterReturn } from "react-hook-form";

import useColor from "../utils/colors";

import { ArrowPathIcon } from "@heroicons/react/24/solid";


type FormProps = {
    disabled?: boolean;
    name: string;
    label: string;
    errors?: string | undefined;
    type?: string;
    single?: boolean;
    register: UseFormRegisterReturn<string>;
    isLoading?: boolean;
    button?: string;
}


export function FormGroup({ disabled, name, label, errors, type, single, register, isLoading, button }: FormProps) {

    const highlight = useColor()


    return (
        <div className="form-group">
            {type == "check" ?
                <label
                    className="private"
                    htmlFor="private">
                    <div className="form-group-check">
                        <label
                            className={`flex items-center
                                ${highlight.label}
                                `}>
                            <input type="checkbox" className={`mr-2
                            ${highlight.accent}
                            `}
                                {...register}
                            />
                            {label}
                        </label>
                    </div>
                </label>
                :
                <>
                    <label
                        className={disabled ? "text-base" : ""}
                        htmlFor={name}>
                        {label}
                        <span>
                            {errors}
                        </span>
                    </label>
                    {single ?
                        <div className="single">
                            <input
                                {...register}
                                type={type ? type : "text"} 
                                className={`${highlight.caret} ${highlight.focus}`}
                            />
                            <button
                                className={highlight.bg}
                                type="submit"
                            >
                                {isLoading ?
                                    <ArrowPathIcon className="size-4 mx-2 animate-spin" />
                                    :
                                    (button ?
                                        button
                                        :
                                        "SAVE"
                                    )
                                }

                            </button>
                        </div>
                        :
                        <>
                            {type == "textarea" ?
                                <textarea
                                    className={`${highlight.caret} ${highlight.focus}`}
                                    {...register}
                                    disabled={disabled}
                                    name={name}
                                ></textarea>
                                :
                                <input
                                    {...register}
                                    disabled={disabled}
                                    type={type} 
                                    name={name} 
                                    className={`${highlight.focus} ${highlight.caret}`}
                                    />
                            }
                        </>
                    }
                </>
            }
        </div>
    )
}

export default FormGroup;