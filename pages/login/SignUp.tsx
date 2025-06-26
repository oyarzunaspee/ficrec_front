import { useEffect } from "react";
import { useForm } from "react-hook-form";

import CardFooter from "../../components/CardFooter";
import CardHead from "../../components/CardHead";
import FormGroup from "../../components/FormGroup";
import FormError from "../../components/FormError";


import { useSignUpMutation } from "../../store/api/auth";

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const SignupSchema = z.object({
    username: z.string(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    password_check: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

type SignupSchemaType = z.infer<typeof SignupSchema>;


const SignUp = ({ setLogInCard }: { setLogInCard: Function }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupSchemaType>({ resolver: zodResolver(SignupSchema) })

    const [useSignup, result] = useSignUpMutation()

    const performSignup = handleSubmit((data: SignupSchemaType) => {

        useSignup(data)
            .unwrap()
            .then(() => {
                reset({
                    username: "",
                    password: "",
                    password_check: ""
                })
            })
    })

    useEffect(() => {
        if (result.isSuccess) {
            setLogInCard(true)
        }
    }, [result.isSuccess])

    return (
        <>
            <div className="card w-full">
                <CardHead
                    title="Create account"
                />
                <div className="card-body">
                    <form onSubmit={performSignup}>
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
                            <FormGroup
                                name="password_check"
                                label="Confirm Password"
                                errors={errors.password_check?.message}
                                type="password"
                                register={register("password_check", { required: true })}
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
                </div>
            </div>
        </>
    )
}

export default SignUp;