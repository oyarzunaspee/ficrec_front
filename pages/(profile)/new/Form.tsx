import FormGroup from "../../../components/FormGroup";
import CardFooter from "../../../components/CardFooter";
import { useForm, Resolver } from "react-hook-form";
import { useNewCollectionMutation } from "../../../store/api/profile";
import { navigate } from "vike/client/router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { close } from "../../../store/slices/popup";
import { dispatchResult } from "../../../utils/dispatchResult";
import { useEffect, useState } from "react";

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

    const [uid, setUid] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver })

    const [newCollection, result] = useNewCollectionMutation();
    const onSubmitNewCollection = (data: FormValues) => {
        newCollection(data)
            .unwrap()
            .then((data) => {
                setUid(data.uid)
            })
        }
        
    useEffect(() => {
        if (result.isSuccess) {
            dispatch(close())
            navigate(`/collections/${uid}`);
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
            <form onSubmit={handleSubmit(onSubmitNewCollection)}>
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
                </div>
                <CardFooter
                    isLoading={result.isLoading}
                />
            </form>
        </>
    )
}

export default NewForm;