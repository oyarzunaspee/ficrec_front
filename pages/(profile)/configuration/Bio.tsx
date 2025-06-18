import CardHead from "../../../components/CardHead";
import CardFooter from "../../../components/CardFooter";
import FormGroup from "../../../components/FormGroup.js";
import { useForm, useWatch, Control } from "react-hook-form";
import { useUpdateProfileMutation } from "../../../store/api/profile";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { updateHighlight } from "../../../store/slices/highlight";
import { useAppDispatch } from "../../../store/hooks";
import { dispatchResult } from "../../../utils/dispatchResult";



type FormValues = {
    highlight?: string;
    avatarFile?: File | null;
    bio?: string;
    avatar?: string;
}

type BioProps = {
    open: number;
    setOpen: Function;
    highlight?: string;
    avatar?: string;
    bio?: string;
}

const Bio = ({ open, setOpen, highlight, avatar, bio }: BioProps) => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            bio: bio,
            highlight: highlight,
            avatar: avatar
        }
    })


    const [updateProfile, result] = useUpdateProfileMutation();

    const submitBio = handleSubmit((data: FormValues) => {
        updateProfile(data)
            .unwrap()
            .then(() => {
                dispatch(updateHighlight(data.highlight));
            })
    })

    dispatchResult({
        type: "Profile",
        action: "updated",
        error: result.isError,
        success: result.isSuccess
    })

    const convertFile = (e: any) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            setValue("avatar", reader.result);
        };
    }

    return (
        <>
            <section className="card mb-5
            lg:mb-10
            ">
                <input
                    type="checkbox"
                    checked={open == 1 ? true : false}
                    className="peer sr-only"
                    readOnly
                />
                <CardHead
                    onClick={() => {
                        const item = open == 1 ? 0 : 1
                        setOpen(item)
                    }}
                    title="Profile"
                    CornerIcon={open == 1 ? ChevronUpIcon : ChevronDownIcon}
                />
                <div className="card-body accordeon transition-height peer-checked:max-h-900">
                    <form onSubmit={submitBio}>
                        <div className="content">
                            <div className="form-group">
                                <HighlightRender control={control} highlightValue={highlight} setValue={setValue} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar">
                                    Pfp
                                </label>
                                <input
                                    {...register("avatarFile", { onChange: convertFile })}
                                    className="cursor-pointer"
                                    accept="image/png, image/gif, image/jpeg"
                                    type="file"
                                />
                            </div>
                            <FormGroup
                                register={register("bio")}
                                errors={errors.bio?.message}
                                name="bio" type="textarea" label="Bio"
                            />
                        </div>
                        <CardFooter
                            isLoading={result.isLoading}
                        />
                    </form>
                </div>
            </section>
        </>
    )
}

const HighlightRender = ({ control, highlightValue, setValue }: { control: Control<FormValues>, highlightValue?: string, setValue: Function }) => {
    const highlight = useWatch({
        control,
        name: "highlight",
        defaultValue: highlightValue,
    })

    const colors = ["bg-highlight-rose", "bg-highlight-yellow", "bg-highlight-pink", "bg-highlight-orange", "bg-highlight-green", "bg-highlight-indigo", "bg-highlight-violet", "bg-highlight-slate"];


    return (
        <>
            <label htmlFor="highlight">
                Highlight
            </label>
            <div className="flex flex-wrap justify-center">
                {colors.slice(0, 4).map((color) => {
                    return (
                        <div key={`key-${color}`}
                            onClick={() => setValue("highlight", color.match(/^bg-highlight-([\w]+)$/)[1])}
                            className={`${color} rounded-full p-3 mb-1 mr-1 cursor-pointer`}
                        >
                            <CheckCircleIcon className={`size-6
                            ${highlight == color.match(/^bg-highlight-([\w]+)$/)[1] ? "text-white" : "text-transparent"}
                            `} />
                        </div>
                    )
                })
                }
            </div>
            <div className="flex flex-wrap justify-center">
                {colors.slice(-4).map((color) => {
                    return (
                        <div key={`key-${color}`}
                            onClick={() => setValue("highlight", color.match(/^bg-highlight-([\w]+)$/)[1])}
                            className={`${color} rounded-full p-3 mb-1 mr-1 cursor-pointer`}
                        >
                            <CheckCircleIcon className={`size-6
                            ${highlight == color.match(/^bg-highlight-([\w]+)$/)[1] ? "text-white" : "text-transparent"}
                            `} />
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default Bio;