import { useEffect, useState } from "react";
import { navigate } from 'vike/client/router'
import { useForm } from "react-hook-form";

import CardHead from "../../components/CardHead";
import FormGroup from "../../components/FormGroup.js";
import CardFooter from "../../components/CardFooter";
import FormError from "../../components/FormError";

import type { LogInInput } from "../../utils/types.js";

import { useAppDispatch } from "../../store/hooks.js";
import { useLoginMutation } from "../../store/api/auth";
import { refreshToken } from "../../store/slices/token";

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
    username: z.string(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

type LoginSchemaType = z.infer<typeof LoginSchema>;


const LogIn = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })

    const [useLogin, result] = useLoginMutation();

    const [fetchError, setFetchError] = useState<string | undefined>()

    const performLogin = handleSubmit((data: LoginSchemaType) => {
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
                                register={register("username", { required: true })}
                            />
                            <FormGroup
                                name="password"
                                label="Password"
                                errors={errors.password?.message}
                                type="password"
                                register={register("password", { required: true })}
                            />
                            <FormError
                                error={result.error}
                                fields={["username", "password"]}
                            />
                        </div>
                        <CardFooter
                            error={result.error}
                            isLoading={result.isLoading}
                            button="Go!"
                        />

                    </form>
                </div >
            </div >
        </>
    )
}

export default LogIn;