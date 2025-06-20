import { useForm, Resolver } from "react-hook-form";

import CardFooter from "../../components/CardFooter";
import CardHead from "../../components/CardHead";
import FormGroup from "../../components/FormGroup";

import type { SignUpInput } from "../../utils/types";

import { useSignUpMutation } from "../../store/api/auth";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

type FormValues = {
    username: string;
    password: string;
    password_check: string;
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

const SignUp = () => {
    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<FormValues>({ resolver })

    const [useSignup, result] = useSignUpMutation()
    
    const performSignup = handleSubmit((data: FormValues) => {
        console.log(data)
    
        useSignup(data)
            .unwrap()
            .then(() => {
                reset({
                    username: "",
                    password: "",
                    password_check: ""
                })
            })
            .catch((e) => {
                console.log(e)
            })
        })

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
                                register={register("username", {
                                    required: true,
                                    minLength: { value: 4, message: "Username should be at least 4 characters long" },
                                    // validate: validateUsername
                                })}
                            />
                            <FormGroup
                                name="password"
                                label="Password"
                                errors={errors.password?.message}
                                type="password"
                                register={register("password", {
                                    required: true,
                                    minLength: { value: 6, message: "Password should be at least 6 characters long" },
    
                                })}
                            />
                            <FormGroup
                                name="password_check"
                                label="Confirm Password"
                                errors={errors.password_check?.message}
                                type="password"
                                register={register("password_check", { required: true })}
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

export default SignUp;