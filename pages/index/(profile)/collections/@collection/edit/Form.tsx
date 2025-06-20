import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import FormGroup from "../../../../../../components/FormGroup";
import CardFooter from "../../../../../../components/CardFooter";

import type { Collection } from "../../../../../../utils/types";

import { useForm, Resolver, useWatch, Control } from "react-hook-form";
import { useEditCollectionMutation } from "../../../../../../store/api/profile";
import { dispatchResult } from "../../../../../../utils/dispatchResult";
import { useMediaQuery } from "../../../../../../utils/mediaQuery";


type FormProps = {
    name: string;
    uid: string;
    privacy: boolean;
    about?: string | undefined;
    setOpen?: Function;
}
const Form = ({ name, uid, privacy, about, setOpen }: FormProps) => {
    const { routeParams } = usePageContext();
    const isLG = useMediaQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Partial<Collection>>({
        defaultValues: {
            name: name,
            private: privacy,
            about: about
        }
    })

    const [useEditCollection, result] = useEditCollectionMutation();

    const performEditCollection = handleSubmit((data: Partial<Collection>) => {
        useEditCollection({ uid, data })
            .unwrap()
            .then()
    })

    useEffect(() => {
        if (result.isSuccess && setOpen != undefined && isLG) {
            setOpen(false)
        }

        if (result.isSuccess && !isLG) {
            navigate(routeParams.collection ? `/collections/${routeParams.collection}` : "/");
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
            <form onSubmit={performEditCollection}>
                <div className="content">
                    <FormGroup
                        name="name"
                        label="Name"
                        type="text"
                        errors={errors.name?.message}
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
                    error={result.error}
                    isLoading={result.isLoading}
                />
            </form>
        </>
    )
}

export default Form;