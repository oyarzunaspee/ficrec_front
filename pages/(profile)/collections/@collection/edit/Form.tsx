import FormGroup from "../../../../../components/FormGroup";
import CardFooter from "../../../../../components/CardFooter";
import { useForm, Resolver, useWatch, Control } from "react-hook-form";
import { useEditCollectionMutation } from "../../../../../store/api/profile";
import { dispatchResult } from "../../../../../utils/dispatchResult";
import { useEffect } from "react";
import { useMediaQuery } from "../../../../../store/hooks";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";

type FormValues = {
    name: string;
    private: boolean;
    about?: string | void;
}

type FormProps = {
    name: string;
    uid: string;
    privacy: boolean;
    about?: string | void;
    setOpen?: Function;
}
const Form = ({ name, uid, privacy, about, setOpen }: FormProps) => {
    const context = usePageContext();
    const isLG = useMediaQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: name,
            private: privacy,
            about: about
        }
    })

    const [updateCollection, result] = useEditCollectionMutation();

    const submitEditCollection = handleSubmit((data: FormValues) => {
        updateCollection({ uid, data })
            .unwrap()
            .then()
    })

    useEffect(() => {
        if (result.isSuccess && setOpen != undefined && isLG) {
            setOpen(false)
        }

        if (result.isSuccess && !isLG) {
            navigate(context.routeParams.collection ? `/collections/${context.routeParams.collection}` : "/");
        }
    }, [result.isSuccess])

    

    dispatchResult({
            type: "Collection",
            action: "edited",
            error: result.isError,
            success: result.isSuccess
        })

    return (
        <>
            <form onSubmit={submitEditCollection}>
                <div className="content">
                    <FormGroup
                        name="name"
                        label="Name"
                        type="text"
                        errors={errors}
                        register={register("name")}
                    />
                    <FormGroup
                        name="private"
                        label="Private"
                        errors={errors}
                        type="check"
                        register={register("private")}
                    />
                    <FormGroup
                        name="about"
                        label="About"
                        errors={errors}
                        type="textarea"
                        register={register("about")}
                    />
                </div>
                <CardFooter
                    error={result.error}
                    isLoading={result.isLoading}
                />
            </form>
        </>
    )
}

export default Form;