import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePageContext } from "vike-react/usePageContext";

import CardFooter from "../../../../../components/CardFooter";
import Dropdown from "../../../../../components/Dropdown";
import Popup from "../../../../../components/Popup";

import type { Rec } from "../../../../../utils/types";

import { useAppSelector } from "../../../../../store/hooks";
import { useEditRecMutation, useDeleteRecMutation } from "../../../../../store/api/profile";
import { useOutsideClick } from "../../../../../utils/outsideClick";
import { dispatchResult } from "../../../../../utils/dispatchResult";
import { useMediaQuery } from "../../../../../utils/mediaQuery";
import useColor from "../../../../../utils/colors";

import parse from 'html-react-parser';
import { TrashIcon, PencilSquareIcon, XCircleIcon, ArrowPathIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const formatWords = (num: number) => {
    const numf = new Intl.NumberFormat();
    let numString = numf.format(num);
    const pos = numString.indexOf(".");
    return pos != -1 ? numString.slice(0, pos) + "K" : numString
}


const IndividualRec = ({ uid, title, author, link, fandom, rating, chapters, words, warnings, characters, ship, tags, summary, notes }: Rec) => {
    const { routeParams } = usePageContext();
    const highlight = useColor()
    
    const collectionDisplay = useAppSelector((state) => state.collectionDisplay.value);

    const [editRec, setEditRec] = useState<boolean>(false);
    const [deleteRec, setDeleteRec] = useState<boolean>(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Pick<Rec, "notes">>({
        defaultValues: {
            notes: notes
        }
    })

    const [useEditRec, result] = useEditRecMutation();
    const performEditRec = async (data: Pick<Rec, "notes">) => {
        await useEditRec({
            collection: routeParams.collection,
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
                        <form onSubmit={handleSubmit(performEditRec)}>
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
                                            rows={4}
                                            {...register("notes", { required: false })}
                                            className={`text-lg ${highlight.focus} ${highlight.caret}`}
                                            name="notes"></textarea>
                                            <span className="form-error">
                                                {errors.notes?.message}
                                            </span>

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
                                            {fandom.map((fandom: string) => <span key={fandom} className="list">{fandom}</span>)}
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
                                            {warnings.map((warning: string) => <span key={warning} className="list">{warning}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.characters &&
                                    <tr>
                                        <td>
                                            Characters
                                        </td>
                                        <td>
                                            {characters.map((character: string) => <span key={character} className="list">{character}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.ship &&
                                    <tr>
                                        <td>
                                            Ships
                                        </td>
                                        <td>
                                            {ship.map((ship: string) => <span key={ship} className="list">{ship}</span>)}
                                        </td>
                                    </tr>
                                }
                                {collectionDisplay.tags &&
                                    <tr>
                                        <td>
                                            Tags
                                        </td>
                                        <td>
                                            {tags.map((tag: string) => <span key={tag} className="list">{tag}</span>)}
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

    const [popup, setPopup] = useState<boolean>(false);

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
    const { routeParams } = usePageContext();

    const isLG = useMediaQuery();

    const [useDeleteRec, result] = useDeleteRecMutation();

    const performDelete = async () => {
        await useDeleteRec({ collection: routeParams.collection, uid: uid })
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
                        onClick={performDelete}
                        button="DELETE"
                        error={result.error}
                        isLoading={result.isLoading}
                    />
                </div>
            }
        </>
    )
}

export default IndividualRec;