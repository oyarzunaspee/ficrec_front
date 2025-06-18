import { useForm, Resolver } from "react-hook-form";
import CardFooter from "../../components/CardFooter.js";
import { useEffect } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "../../store/hooks.js";
import { useLoginMutation } from "../../store/api/auth";
import { navigate } from 'vike/client/router'
import { refreshToken } from "../../store/slices/token";
import CardHead from "../../components/CardHead";
import { LogInInput } from "../../utils/types.js";
import { ComponentType, ComponentProps } from "react";
import FormGroup from "../../components/FormGroup.js";
import { IconTag, onClickType } from "../../components/types.js";

type FormValues = {
    username: string
    password: string
}


const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.username ? values : {},
        errors: !values.username
            ? {
                username: {
                    type: "required",
                    message: "Username is required.",
                },
            }
            : {},
    }
}



export function LogIn({ icon, onClick }: { icon: IconTag, onClick: onClickType }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver })

    const [logIn, result] = useLoginMutation();

    const dispatch = useAppDispatch();


    const onSubmitLogIn = handleSubmit((data: FormValues) => {
        logIn(data as LogInInput)
            .unwrap()
            .then((res) => {
                dispatch(refreshToken(res.token))
            })
    })

    const token = useAppSelector((state) => state.token.value)
    useEffect(() => {
        if (result.isSuccess) {
            navigate("/");
        }
    }, [result.isSuccess])


    return (
        <>
            <CardHead
                title="Login"
                onClick={onClick}
                CornerIcon={icon}
            />
            <div className="card-body">
                <form onSubmit={onSubmitLogIn}>
                    <div className="content">
                        <FormGroup
                            name="username"
                            label="Username"
                            errors={errors.username?.message}
                            type="text"
                            register={register("username", {
                                required: true
                            })}
                        />
                        <FormGroup
                            name="password"
                            label="Password"
                            errors={errors.password?.message}
                            type="password"
                            register={register("password", {
                                required: true
                            })}
                        />
                    </div>
                    <div className="lg:absolute lg:bottom-5 lg:right-5">

                        <div className="card-footer pb-5">
                            <button
                                type="submit"
                                className={result.error ? "bg-error" : "bg-secondary"}
                            >
                                {result.isLoading ?
                                    <ArrowPathIcon className="icon-spin" />
                                    :
                                    "GO!"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LogIn