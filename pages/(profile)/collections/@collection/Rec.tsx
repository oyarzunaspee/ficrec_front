import CardFooter from "../../../../components/CardFooter";
import { TrashIcon, PencilSquareIcon, XCircleIcon, ArrowPathIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useEditRecMutation, useDeleteRecMutation } from "../../../../store/api/profile";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import parse from 'html-react-parser';
import { usePageContext } from "vike-react/usePageContext";
import { useOutsideClick } from "../../../../utils/outsideClick";
import Dropdown from "../../../../components/Dropdown";
import { useMediaQuery } from "../../../../store/hooks";
import Popup from "../../../../components/Popup";
import { dispatchResult } from "../../../../utils/dispatchResult";
import useColor from "../../../../utils/colors";


const formatWords = (num: number) => {
    const numf = new Intl.NumberFormat();
    let numString = numf.format(num);
    const pos = numString.indexOf(".");
    return pos != -1 ? numString.slice(0, pos) + "K" : numString
}

type RecProps = {
    uid: string;
    title: string;
    author: Array<string>;
    link: string;
    fandom: Array<string>;
    rating: string;
    chapters: string;
    words: number;
    warnings: Array<string> | [];
    characters: Array<string> | [];
    ship: Array<string> | [];
    tags: Array<string> | [];
    summary: string | "";
    notes: string | "";
}


const Rec = ({ uid, title, author, link, fandom, rating, chapters, words, warnings, characters, ship, tags, summary, notes }: RecProps) => {
    const context = usePageContext();
    const highlight = useColor()
    const collectionDisplay = useAppSelector((state) => state.collectionDisplay.value);

    const [editRec, setEditRec] = useState(false);
    const [deleteRec, setDeleteRec] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Pick<RecProps, "notes">>({
        defaultValues: {
            notes: notes
        }
    })

    const [updateRec, result] = useEditRecMutation();
    const onSubmitEditRec = (data: Pick<RecProps, "notes">) => {
        updateRec({
            collection: context.routeParams.collection,
            uid: uid,
            data: data
        })
            .unwrap()
            .then(() => {
                setEditRec(false);
            })
    }

    dispatchResult({
        type: "Notes",
        action: "updated",
        error: result.isError,
        success: result.isSuccess
    })


    return (
        <section key={uid} className="py-5">
            <div className="card">
                <div className="card-body">
                    <div className="content border-t-0 lg:relative">
                        <form onSubmit={handleSubmit(onSubmitEditRec)}>
                            <div className="form-group">
                                <Menu
                                    editRec={editRec}
                                    setEditRec={setEditRec}
                                    setDeleteRec={setDeleteRec}
                                    deleteRec={deleteRec}
                                />
                                {editRec ?
                                    <>
                                        <textarea
                                            {...register("notes", { required: false })}
                                            className={`text-lg ${highlight.focus} ${highlight.caret}`}
                                            name="notes"></textarea>

                                    </>
                                    :
                                    <>
                                        <p className="text-lg">
                                            {notes}
                                        </p>
                                    </>
                                }
                            </div>
                            {editRec &&
                                <CardFooter
                                    isLoading={result.isLoading}
                                />
                            }
                            {deleteRec &&
                                <Delete
                                    title="Delete rec"
                                    deleteRec={deleteRec}
                                    setDeleteRec={setDeleteRec}
                                    recTitle={title}
                                    uid={uid}
                                />
                            }
                        </form>

                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        Title
                                    </td>
                                    <td className="font-bold">
                                        {title}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Author
                                    </td>
                                    <td>
                                        {author}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Link
                                    </td>
                                    <td>
                                        <a className={`
                                            ${highlight.text}
                                            underline`} href={link}>
                                            {link}
                                        </a>
                                    </td>
                                </tr>
                                {collectionDisplay.fandom &&
                                    <tr>
                                        <td>
                                            Fandom
                                        </td>
                                        <td>
                                            {fandom.map((fandom) => <span key={fandom} className="list">{fandom}</span>)}
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>
                                        Rating
                                    </td>
                                    <td>
                                        {rating}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Chapters
                                    </td>
                                    <td>
                                        {chapters}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Words
                                    </td>
                                    <td>
                                        {formatWords(words)}
                                    </td>
                                </tr>
                                {collectionDisplay.warnings &&
                                    <tr>
                                        <td>
                                            Warnings
                                        </td>
                                        <td>
                                            {warnings.map((warning) => <span key={warning} className="list">{warning}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.characters &&
                                    <tr>
                                        <td>
                                            Characters
                                        </td>
                                        <td>
                                            {characters.map((character) => <span key={character} className="list">{character}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.ship &&
                                    <tr>
                                        <td>
                                            Ships
                                        </td>
                                        <td>
                                            {ship.map((ship) => <span key={ship} className="list">{ship}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.tags &&
                                    <tr>
                                        <td>
                                            Tags
                                        </td>
                                        <td>
                                            {tags.map((tag) => <span key={tag} className="list">{tag}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.summary &&
                                    <tr>
                                        <td>
                                            Summary
                                        </td>
                                        <td>
                                            {parse(summary || "")}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Menu = ({ editRec, setEditRec, setDeleteRec, deleteRec }: { editRec: boolean, setEditRec: Function, setDeleteRec: Function, deleteRec: boolean }) => {

    const [popup, setPopup] = useState(false);

    const items = [
        {
            title: "Edit notes",
            Icon: PencilSquareIcon,
            click: () => {
                setPopup(false);
                setEditRec(true);
            }
        },
        {
            title: "Delete rec",
            Icon: TrashIcon,
            click: () => {
                setDeleteRec(true);
                setPopup(false);
            }
        }
    ]

    const handleClickOutside = () => {
        setPopup(false);
    };


    const ref = useOutsideClick(handleClickOutside);

    const isLG = useMediaQuery();

    return (
        <>
            {(popup && !isLG) &&
                <div className="screen"></div>
            }
            <div className="flex justify-between">
                <label className="text-secondary font-bold" htmlFor="notes">
                    Notes
                </label>
                {editRec || (deleteRec && !isLG) ?
                    <div
                        onClick={() => {
                            setDeleteRec(false);
                            setEditRec(false);
                        }}
                        className="pl-5 cursor-pointer pb-5">
                        <XCircleIcon className="size-6 shrink-0 text-primary" />
                    </div>
                    :
                    <>
                        <div

                            onClick={() => {
                                setPopup(true);
                            }}
                            className="pl-5 cursor-pointer pb-5">
                            <EllipsisVerticalIcon className="size-5 shrink-0" />
                        </div>

                        <Dropdown
                            right="lg:right-3"
                            top="lg:top-10"
                            ref={ref}
                            open={popup}
                            items={items}
                        />
                    </>
                }

            </div>
        </>
    )
}

const Delete = ({ title, deleteRec, setDeleteRec, recTitle, uid }: { title: string, deleteRec: boolean, setDeleteRec: Function, recTitle: string, uid: string }) => {
    const context = usePageContext();

    const isLG = useMediaQuery();

    const [performDelete, result] = useDeleteRecMutation();

    const submitDelete = () => {
        performDelete({ collection: context.routeParams.collection, uid: uid })
            .unwrap()
            .then()
    }

    dispatchResult({
        type: "Rec",
        action: "deleted",
        error: result.isError,
        success: result.isSuccess
    })

    const ref = useOutsideClick(() => {
        setDeleteRec(false);
    });

    const body = (
        <>
            <div className="content">
                <h3>
                    Delete <span className="text-error font-bold italic">{recTitle}</span> ?
                </h3>
            </div>
            <CardFooter
                button="DELETE"
            />
        </>
    )

    return (
        <>
            {(isLG && deleteRec) ?
                <div className="hidden lg:block">
                    <Popup
                        ref={ref}
                        title={title}
                        open={deleteRec}
                        setOpen={setDeleteRec}
                        body={body}
                    />
                </div>
                :
                <div className="lg:hidden">
                    <CardFooter
                        onClick={submitDelete}
                        button="DELETE"
                        error={result.error}
                        isLoading={result.isLoading}
                    />
                </div>
            }
        </>
    )
}

export default Rec;