import { useState, useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import Loading from "../../../../../components/Loading";
import Dropdown from "../../../../../components/Dropdown";
import Form from "./edit/Form";
import Popup from "../../../../../components/Popup";
import CardFooter from "../../../../../components/CardFooter";

import { useDeleteCollectionMutation, useGetCollectionQuery } from "../../../../../store/api/profile";
import { useAppDispatch } from "../../../../../store/hooks";
import { initDisplay } from "../../../../../store/slices/collectionDisplay";
import { useOutsideClick } from "../../../../../utils/outsideClick";
import { dispatchResult } from "../../../../../utils/dispatchResult";
import { useMediaQuery } from "../../../../../utils/mediaQuery";
import useColor from "../../../../../utils/colors";

import { EllipsisVerticalIcon, XCircleIcon, LockOpenIcon, LockClosedIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";

const About = () => {
    const dispatch = useAppDispatch();
    const { routeParams } = usePageContext();
    const highlight = useColor()


    const { data, error, isLoading } = useGetCollectionQuery(routeParams.collection);

    useEffect(() => {
        if (data) {
            dispatch(initDisplay(data));
        }

    }, [data])

    const [editCollection, setEditCollection] = useState<boolean>(false);
    const [deleteCollection, setDeleteCollection] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(false);

    if (!data) return null;

    if (isLoading) {
        return (
            <Loading />
        )
    }


    return (
        <>
            <div className="card lg:relative">
                <div
                    className="card-head">
                    <div className="title flex justify-center">
                        <span>
                            {data.name}
                        </span>
                    </div>

                    <div
                        className="corner"
                        onClick={(!editCollection && !deleteCollection) ?
                            () => setDropdown(true)
                            :
                            () => {
                                setEditCollection(false)
                                setDeleteCollection(false)
                            }
                        }
                    >
                        {(!editCollection && !deleteCollection) ?
                            <EllipsisVerticalIcon className="icon" />
                            :
                            <XCircleIcon className="icon" />
                        }

                        <Menu
                            dropdown={dropdown}
                            collection={routeParams.collection}
                            setDropdown={setDropdown}
                            setEditCollection={setEditCollection}
                            setDeleteCollection={setDeleteCollection}
                            username={data.username}
                        />
                    </div>
                </div>

                <div className="card-body">
                    <div className="content text-primary">
                        <label className="font-bold flex mb-3">
                            {data.private ?
                                <>
                                    <LockClosedIcon className={`size-5 mr-2
                        ${highlight.text}    
                        `} />
                                    <span>
                                        Private
                                    </span>
                                </>
                                :
                                <>
                                    <LockOpenIcon className={`size-5 mr-2 ${highlight.text}    
                        `} />
                                    <span>
                                        Public
                                    </span>
                                </>
                            }
                        </label>
                        <p>
                            {data.about}
                        </p>
                    </div>
                    <DeleteCollection deleteCollection={deleteCollection} setDeleteCollection={setDeleteCollection} name={data.name} />
                </div>
            </div>

            <EditPopup
                setEditCollection={setEditCollection}
                editCollection={editCollection}
                name={data.name}
                uid={routeParams.collection}
                privacy={data.private}
                about={data.about}
            />
        </>
    )
}

const copyContent = async (value: string) => {
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch (err) {
        return false;
    }
}

type MenuProps = {
    dropdown: boolean;
    collection: string;
    setDropdown: Function;
    setEditCollection: Function;
    setDeleteCollection: Function;
    username?: string;
}

const Menu = ({ dropdown, collection, setDropdown, setEditCollection, setDeleteCollection, username }: MenuProps) => {
    const { routeParams } = usePageContext();

    const [copied, setCopied] = useState<boolean>(false);

    dispatchResult({
        type: "Link",
        action: "copied",
        success: copied,
        extra: setCopied
    })


    const ref = useOutsideClick(() => {
        setDropdown(false);
    });

    const isLG = useMediaQuery();

    const items = [
        {
            title: "Copy link",
            Icon: ClipboardDocumentIcon,
            click: async () => {
                const copy = `https://ficrec.top/@${username}/${collection}`
                const copiedResult = await copyContent(copy);
                setCopied(copiedResult);
                setDropdown(false);
            }
        },
        {
            title: "Edit",
            Icon: PencilSquareIcon,
            click: async () => {
                if (isLG) {
                    await setEditCollection(true);
                } else {
                    navigate(`/${routeParams.collection}/edit`);
                }
                setDropdown(false);
            }
        },
        {
            title: "Delete",
            Icon: TrashIcon,
            click: async () => {
                await setDeleteCollection(true);
                setDropdown(false);
            }
        }
    ]
    return (
        <>
            <Dropdown
                right="lg:right-5"
                top="lg:top-14"
                ref={ref}
                items={items}
                open={dropdown} />
        </>
    )
}


type EditPopupProps = {
    setEditCollection: Function;
    editCollection: boolean;
    name: string;
    uid: string;
    privacy: boolean;
    about?: string | undefined;
}

const EditPopup = ({ setEditCollection, editCollection, name, uid, privacy, about }: EditPopupProps) => {

    const isLG = useMediaQuery();

    const ref = useOutsideClick(() => {
        setEditCollection(false);
    });

    const body = (<Form name={name} uid={uid} privacy={privacy} about={about} setOpen={setEditCollection} />)

    return (
        <>
            {(editCollection && isLG) &&
                <>
                    <div className="screen"></div>
                    <Popup
                        ref={ref}
                        title="Edit collection"
                        open={editCollection}
                        setOpen={setEditCollection}
                        body={body}
                    />
                </>
            }
        </>
    )
}

const DeleteCollection = ({ deleteCollection, setDeleteCollection, name }: { deleteCollection: boolean, setDeleteCollection: Function, name: string }) => {
    const { routeParams } = usePageContext();
    const isLG = useMediaQuery();

    const [useDeleteCollection, result] = useDeleteCollectionMutation();

    const performDeleteCollection = async () => {
        await useDeleteCollection(routeParams.collection)
            .unwrap()
            .then(() => navigate("/"))
    }

    dispatchResult({
        type: "Collection",
        action: "deleted",
        error: result.isError,
        success: result.isSuccess
    })

    const ref = useOutsideClick(() => {
        setDeleteCollection(false);
    });

    const body = (
        <>
            <div className="content">
                <h3>
                    Delete <span className="italic font-bold text-error">
                        {name}
                    </span>
                    ?
                </h3>
            </div>
            <CardFooter
                error={result.error}
                onClick={performDeleteCollection}
                isLoading={result.isLoading}
                button="DELETE"
            />
        </>
    )

    return (
        <>
            {(isLG && deleteCollection) ?
                <>
                    {deleteCollection &&
                        <>
                            <div className="screen"></div>
                            <Popup
                                ref={ref}
                                title="Delete collection"
                                open={deleteCollection}
                                setOpen={setDeleteCollection}
                                body={body}
                            />
                        </>
                    }
                </>
                :
                <div className={`transition-height duration-200 ease-in-out overflow-hidden
                ${deleteCollection ? "max-h-50" : "max-h-0"}
                `}>
                    <CardFooter
                        onClick={performDeleteCollection}
                        error={result.error}
                        isLoading={result.isLoading}
                        button="DELETE"
                    />
                </div>
            }
        </>
    )
}

export default About;