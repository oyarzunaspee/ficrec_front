import { useEffect } from "react";
import { navigate } from 'vike/client/router'
import { useForm, Resolver } from "react-hook-form";

import CardHead from "../../components/CardHead";
import FormGroup from "../../components/FormGroup.js";

import type { LogInInput } from "../../utils/types.js";

import { useAppDispatch, useAppSelector } from "../../store/hooks.js";
import { useLoginMutation } from "../../store/api/auth";
import { refreshToken } from "../../store/slices/token";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

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



const LogIn = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver })

    const [useLogin, result] = useLoginMutation();



    const performLogin = handleSubmit((data: FormValues) => {
        useLogin(data as LogInInput)
            .unwrap()
            .then((res) => {
                dispatch(refreshToken(res.token))
            })
    })

    useEffect(() => {
        if (result.isSuccess) {
            navigate("/");
        }
    }, [result.isSuccess])


    return (
        <>
        <div className="card w-full">
            <CardHead
                title="Login"
            />
            <div className="card-body">
                <form onSubmit={performLogin}>
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

                </form>
            </div>
            </div>
        </>
    )
}

export default LogIn;