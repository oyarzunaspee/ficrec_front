import { useForm } from "react-hook-form";
import { navigate } from "vike/client/router";

import CardHead from "../../../components/CardHead";
import FormGroup from "../../../components/FormGroup";

import { useDeactivateUserMutation } from "../../../store/api/user";
import { dispatchResult } from "../../../utils/dispatchResult";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"

type FormValues = {
    password: string;
}

const Deactivate = ({ open, setOpen }: { open: number, setOpen: Function }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [useDeactivateUser, result] = useDeactivateUserMutation();
    const performDeactivateUser = handleSubmit((data: FormValues) => {
        useDeactivateUser(data)
            .unwrap()
            .then(() => {
                navigate("/login");
            })
    })

    dispatchResult({
        type: "Account", 
        action: "deactivated", 
        error: result.isError
    })


    return (
        <>
            <section className="card ">
                <input
                    type="checkbox"
                    checked={open == 4 ? true : false}
                    className="peer sr-only"
                    readOnly
                />
                <CardHead
                    onClick={() => {
                        const item = open == 4 ? 0 : 4
                        setOpen(item)
                    }}
                    title="Deactivate"
                    CornerIcon={open == 4 ? ChevronUpIcon : ChevronDownIcon}
                />
                <div className="card-body accordeon transition-height">
                    <form onSubmit={performDeactivateUser}>
                        <div className="content">
                            <FormGroup
                                register={register("password", { required: true })}
                                errors={errors.password?.message}
                                isLoading={result.isLoading}
                                name="password" single type="password" label="Type your password to deactivate" button="DEACTIVATE"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Deactivate;