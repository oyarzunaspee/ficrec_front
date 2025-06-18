import { useForm, Resolver } from "react-hook-form";
import { useSignUpMutation } from "../../store/api/auth";
import { SignUpInput } from "../../utils/types";
import CardFooter from "../../components/CardFooter";
import CardHead from "../../components/CardHead";
import FormGroup from "../../components/FormGroup";
import { ComponentType, ComponentProps } from "react";
import { IconTag, onClickType } from "../../components/types";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

type FormValues = {
    username: string;
    password: string;
    password_check: string;
}

type Icon = ComponentType<ComponentProps<'svg'>>;

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

export function SignUp({ icon, onClick }: { icon: IconTag, onClick: onClickType }) {
    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<FormValues>({ resolver })

    const [signUp, result] = useSignUpMutation()
    
    const onSubmitSignUp = handleSubmit((data: FormValues) => {
    
        signUp(data)
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
                <CardHead
                    title="Create account"
                    onClick={onClick}
                    CornerIcon={icon}
                />
                <div className="card-body">
                    <form onSubmit={onSubmitSignUp}>
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
                                name="confirmPassword"
                                label="Confirm Password"
                                errors={errors.password_check?.message}
                                type="password"
                                register={register("password_check", { required: true, minLength: 6 })}
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
            </>
        )
}

export default SignUp;