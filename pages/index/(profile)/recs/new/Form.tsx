import { useEffect, useState } from "react";
import { useForm, Control, useWatch } from "react-hook-form";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from 'vike/client/router'

import FormGroup from "../../../../../components/FormGroup";
import CardFooter from "../../../../../components/CardFooter";
import FormError from "../../../../../components/FormError";

import { UserCollection } from "../../../../../utils/types";

import { useAppDispatch } from "../../../../../store/hooks";
import { useAddRecMutation, useGetUserQuery } from "../../../../../store/api/profile";
import { close } from "../../../../../store/slices/popup";
import { dispatchResult } from "../../../../../utils/dispatchResult";
import { useOutsideClick } from "../../../../../utils/outsideClick";
import { useMediaQuery } from "../../../../../utils/mediaQuery";
import useColor from "../../../../../utils/colors";

import { LockClosedIcon, LockOpenIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";


const RecSchema = z.object({
    collection: z.string(),
    notes: z.string(),
    code: z.string().regex(/^(?<url><a href=\"https:\/\/archiveofourown\.org\/works\/(?:\d+?)\">)<strong>(?<title>.{1,255}?)<\/strong><\/a>\s\((?<words>\d+?)\swords\)\s(?:by\s(?<author>Anonymous|(?:(?:,\s)?<a\shref=\"https:\/\/archiveofourown\.org\/users\/[^_|\d]\w{3,44}\"><strong>[^_|\d]\w{3,44}<\/strong><\/a>)+))?<br\s\/>Chapters:\s(?<chapters>(?:\d+?)\/(?:[?]|\d+?))<br\s\/>Fandom:\s(?<fandom>(?:(?:,\s)?<a.+?<\/a>)+)(?:<br\s\/>)?Rating:\s(?<rating>Explicit|Mature|General Audiences|Teen And Up Audiences|Not Rated)<br\s\/>Warnings:\s(?<warnings>[(,\s)?Graphic Depictions Of Violence|Major Character Death|Author Choose Not To Use Archive Warnings|No Archive Warnings Apply|Rape/Non\-Con|Underage Sex]+)(?:<br\s\/>)?(?:Relationships:\s(?<ship>.+?\/.+?)(?=[\w\s]+:|$))?(?:Characters:\s(?<characters>.+?)(?=[\w\s]+:|$))?(?:Additional\sTags:\s(?<tags>.+?)(?=[\w\s]+:|$))?(?:Series:\s.+?(?=[\w\s]+:|$))?(?:Summary:\s(?<summary>.+?<\/p>))?$/,
        {message: "Invalid code"}
    )
});

type RecSchemaType = z.infer<typeof RecSchema>;

const Form = () => {
    const dispatch = useAppDispatch()
    const { routeParams, previousPageContext } = usePageContext();
    const isLG = useMediaQuery();
    const highlight = useColor()

    const collectionValue = isLG ? routeParams.collection : previousPageContext?.routeParams.collection

    const [collection, setCollection] = useState<string>(collectionValue || "")

    const { data, isLoading, error } = useGetUserQuery();

    if (!data) return null;

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<RecSchemaType>({ resolver: zodResolver(RecSchema) })

    const [useAddRec, result] = useAddRecMutation();
    const performAddRec = async (data: RecSchemaType) => {
        setCollection(data.collection)
        await useAddRec({
            uid: data.collection,
            data: data
        })
            .unwrap()
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

            <form onSubmit={handleSubmit(performAddRec)}>
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
                        register={register("notes", { required: false })}
                    />
                    <div className="form-group">
                        <label htmlFor="code" className="flex">
                            Code
                            <a href="/example" target="_blank">
                                <QuestionMarkCircleIcon className="size-5 ml-1 cursor-pointer" />
                            </a>
                        </label>
                        <textarea
                            rows={4}
                            className={`${highlight.caret} ${highlight.focus}`}
                            {...register("code")}
                            name="code"
                        ></textarea>
                        <span className="form-error">
                                {errors.code?.message}
                            </span>
                    </div>
                    <FormError
                        error={result.error}
                        fields={["notes", "code"]}
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
    control: Control<RecSchemaType>;
    collectionValue?: string;
    collectionList: UserCollection[];
    setValue: Function;
}


const CollectionRender = ({ control, collectionValue, collectionList, setValue }: CollectionRenderProps) => {
    const highlight = useColor()
    const [open, setOpen] = useState<boolean>(false);

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