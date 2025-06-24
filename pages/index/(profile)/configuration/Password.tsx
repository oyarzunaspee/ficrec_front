import { useState } from "react";
import { useForm } from "react-hook-form";

import CardHead from "../../../../components/CardHead";
import FormGroup from "../../../../components/FormGroup";
import CardFooter from "../../../../components/CardFooter";
import FormError from "../../../../components/FormError";

import { useChangePasswordMutation, useVerifyPasswordMutation } from "../../../../store/api/user";
import { dispatchResult } from "../../../../utils/dispatchResult";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

type FormValues = {
    password: string;
}

const Password = ({ open, setOpen }: { open: number, setOpen: Function }) => {

    const [verified, setVerified] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [useVerifyPassword, result] = useVerifyPasswordMutation();
    const performVerifyPassword = handleSubmit((data: FormValues) => {
        useVerifyPassword(data)
            .unwrap()
            .then(() => {
                setVerified(true);
            })
    })

    return (
        <>
            <section className="card lg:mb-10 mb-5">
                <input
                    type="checkbox"
                    checked={open == 3 ? true : false}
                    className="peer sr-only"
                    readOnly
                />
                <CardHead
                    onClick={() => {
                        const item = open == 3 ? 0 : 3
                        setOpen(item)
                    }}
                    title="Password"
                    CornerIcon={open == 3 ? ChevronUpIcon : ChevronDownIcon}
                />
                <div className="card-body accordeon transition-height">
                    <div className="content">
                        <form onSubmit={performVerifyPassword}>
                            <div className="mb-5">
                                <FormGroup
                                    register={register("password", { required: true })}
                                    errors={errors.password?.message}
                                    isLoading={result.isLoading}
                                    name="password"
                                    single
                                    label="Current password"
                                    button="VERIFY"
                                />
                            </div>
                            <FormError
                            error={result.error}
                            fields={["password"]}
                            />
                        </form>
                        <Verify verified={verified} setVerified={setVerified} />
                    </div>
                </div>
            </section>
        </>
    )
}

type VerifyFormValues = {
    password: string;
    password_check: string;
}

const Verify = ({ verified, setVerified }: { verified: boolean, setVerified: Function }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyFormValues>()

    const [useChangePassword, result] = useChangePasswordMutation();
    const performChangePassword = handleSubmit((data: VerifyFormValues) => {
        useChangePassword(data)
            .unwrap()
            .then(() => {
                setVerified(false)
            })
    })

    dispatchResult({
        type: "Password",
        action: "changed",
        error: result.isError,
        success: result.isSuccess
    })

    return (
        <>
            <form onSubmit={performChangePassword}>
                <FormGroup
                    register={register("password", { required: true })}
                    errors={errors.password?.message}
                    name="password" type="password" label="New password"
                    disabled={!verified}
                />
                <FormGroup
                    register={register("password_check", { required: true })}
                    errors={errors.password_check?.message}
                    name="password" type="text" label="Confirm new password"
                    disabled={!verified}
                />
                <FormError
                error={result.error}
                fields={["password", "password_check"]}
                />
                <CardFooter
                    isLoading={result.isLoading}
                    disabled={!verified}
                />
            </form>
        </>
    )
}

export default Password;