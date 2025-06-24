import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { navigate } from "vike/client/router";

import FormGroup from "../../../../components/FormGroup";
import CardFooter from "../../../../components/CardFooter";
import FormError from "../../../../components/FormError";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useNewCollectionMutation } from "../../../../store/api/profile";
import { close } from "../../../../store/slices/popup";
import { dispatchResult } from "../../../../utils/dispatchResult";
import { useMediaQuery } from "../../../../utils/mediaQuery";

type FormValues = {
    name: string;
    private: boolean;
    about: string;
}


const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.name ? values : {},
        errors: !values.name
            ? {
                name: {
                    type: "required",
                    message: "Collection name is required.",
                },
            }
            : {},
    }
}


const NewForm = () => {
    const dispatch = useAppDispatch();
    const isLG = useMediaQuery()

    const [uid, setUid] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver })

    const [useNewCollection, result] = useNewCollectionMutation();
    const performNewCollection = async (data: FormValues) => {
        await useNewCollection(data)
            .unwrap()
            .then((data) => {
                setUid(data.uid)
            })
    }

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(close())
            if (!isLG) {
                navigate(`/collections/${uid}`);
            }
        }
    }, [result.isSuccess])

    dispatchResult({
        type: "Collection",
        action: "created",
        error: result.isError,
        success: result.isSuccess
    })

    return (
        <>
            <form onSubmit={handleSubmit(performNewCollection)}>
                <div className="content">
                    <FormGroup
                        name="name"
                        label="Name"
                        errors={errors.name?.message}
                        type="text"
                        register={register("name")}
                    />
                    <FormGroup
                        name="private"
                        label="Private"
                        errors={errors.private?.message}
                        type="check"
                        register={register("private")}
                    />
                    <FormGroup
                        name="about"
                        label="About"
                        errors={errors.about?.message}
                        type="textarea"
                        register={register("about")}
                    />
                    <FormError
                        error={result.error}
                        fields={["name", "private", "about"]}
                    />
                </div>
                <CardFooter
                    isLoading={result.isLoading}
                />
            </form>
        </>
    )
}

export default NewForm;