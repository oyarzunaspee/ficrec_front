import FormGroup from "../../../../components/FormGroup";
import CardFooter from "../../../../components/CardFooter";
import { useForm, Control, useWatch, Resolver } from "react-hook-form";
import { useAddRecMutation, useGetUserQuery } from "../../../../store/api/profile";
import { navigate } from 'vike/client/router'
import { usePageContext } from "vike-react/usePageContext";
import { LockClosedIcon, LockOpenIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { UserCollection } from "../../../../utils/types";
import { useOutsideClick } from "../../../../utils/outsideClick";
import { useAppDispatch, useMediaQuery } from "../../../../store/hooks";
import { dispatchResult } from "../../../../utils/dispatchResult";
import { close } from "../../../../store/slices/popup";
import useColor from "../../../../utils/colors";

type FormValues = {
    collection: string;
    notes: string;
    code: string;
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.code ? values : {},
        errors: !values.code
            ? {
                code: {
                    type: "required",
                    message: "Fic code is required.",
                },
            }
            : {},
    }
}


const Form = () => {
    const dispatch = useAppDispatch()
    const context = usePageContext();
    const isLG = useMediaQuery();

    const collectionValue = isLG ? context.routeParams.collection : context.previousPageContext?.routeParams.collection

    const [collection, setCollection] = useState(collectionValue || "")

    const { data, isLoading, error } = useGetUserQuery();

    if (!data) return null;

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormValues>({ resolver })

    const [addRec, result] = useAddRecMutation();
    const onSubmitNewCollection = (data: FormValues) => {
        setCollection(data.collection)
        addRec({
            uid: data.collection,
            data: data
        })
            .unwrap()
            .then(() => {
            })
    }
    

    useEffect(() => {
        if (result.isSuccess && !isLG) {
            navigate(`/collections/${collection}`);
        }

        if (result.isSuccess && isLG) {
            dispatch(close());
        }
    }, [result.isSuccess])

    dispatchResult({
        type: "Rec",
        action: "added",
        error: result.isError,
        success: result.isSuccess
    })


    return (
        <>

            <form onSubmit={handleSubmit(onSubmitNewCollection)}>
                <div className="content">
                    <div className="form-group">
                        <label htmlFor="collection">
                            Collection
                        </label>
                        <CollectionRender
                            control={control}
                            collectionValue={collectionValue}
                            collectionList={data.collections}
                            setValue={setValue}
                        />
                    </div>
                    <FormGroup
                        name="notes"
                        label="Notes"
                        errors={errors.notes?.message}
                        type="textarea"
                        register={register("notes", {required: false})}
                    />
                    <FormGroup
                        name="code"
                        label="Code"
                        errors={errors.code?.message}
                        type="textarea"
                        register={register("code")}
                    />
                </div>
                <CardFooter
                    isLoading={result.isLoading}
                />
            </form>
        </>
    )
}

type CollectionRenderProps = {
    control: Control<FormValues>;
    collectionValue?: string;
    collectionList: UserCollection[];
    setValue: Function;
}


const CollectionRender = ({ control, collectionValue, collectionList, setValue }: CollectionRenderProps) => {
    const highlight = useColor()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setValue("collection", collectionValue);
    }, [collectionValue])

    const collection = useWatch({
        control,
        name: "collection"
    })

    const chooseCollection = (uid: string) => {
        setValue("collection", uid);
        setOpen(false);
    }

    const ref = useOutsideClick(() => {
        setOpen(false);
    });

    return (
        <>
            <div
                onClick={() => setOpen(!open)}
                className="select rounded-md flex justify-between py-3 px-2 cursor-pointer">
                <div className="flex-1">
                    <span className="text-secondary">
                        {collection ?
                            <>
                                {collectionList.find((item) => item.uid == collection)?.name}
                            </>
                            :
                            "Select a collection"
                        }
                    </span>
                </div>
                <div className="">
                    <ChevronDownIcon className="size-5 text-primary" />
                </div>
            </div>
            <div className="relative">
                <div className={`absolute w-full overflow-hidden
                                transition-height duration-200 ease-in-out
                                ${open ? "max-h-100" : "max-h-0"}
                                `}>
                    <div ref={ref} className="select rounded-b-md bg-white">
                        {collectionList.map((item) => {
                            return (
                                <div key={item.uid}
                                    onClick={() => chooseCollection(item.uid)}
                                    className={`option
                                            ${collection == item.uid ? "bg-hover" : ""}
                                            `}>
                                    {item.private ?
                                        <LockClosedIcon className="size-4 text-primary" />
                                        :
                                        <LockOpenIcon className="size-4 text-primary" />
                                    }
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Form;