import { useForm } from "react-hook-form";

import CardHead from "../../../components/CardHead";
import FormGroup from "../../../components/FormGroup";

import { useChangeUsernameMutation } from "../../../store/api/profile";
import { dispatchResult } from "../../../utils/dispatchResult";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

type FormValues = {
    username: string;
}

const Username = ({ open, setOpen, username }: { open: number, setOpen: Function, username: string }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            username: username
        }
    })

    const [useChangeUsername, result] = useChangeUsernameMutation();
    const performChangeUsername = handleSubmit((data: FormValues) => {
        useChangeUsername({ new_username: data.username })
            .unwrap()
            .then(() => {
            })
    })

    dispatchResult({
            type: "Username",
            action: "updated",
            error: result.isError,
            success: result.isSuccess
        })

    return (
        <>
            <section className="card mb-5
            lg:mb-10
            ">
                <input
                    type="checkbox"
                    checked={open == 2 ? true : false}
                    className="peer sr-only"
                    readOnly
                />
                <CardHead
                    onClick={() => {
                        const item = open == 2 ? 0 : 2
                        setOpen(item)
                    }}
                    title="Username"
                    CornerIcon={open == 2 ? ChevronUpIcon : ChevronDownIcon}
                />
                <div className="card-body accordeon transition-height">
                    <form onSubmit={performChangeUsername}>
                        <div className="content">
                            <FormGroup
                                register={register("username", { required: true })}
                                errors={errors.username?.message}
                                isLoading={result.isLoading}
                                name="username" single label="New username"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Username;