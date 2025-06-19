import { useDeleteCollectionMutation, useGetCollectionQuery } from "../../../../store/api/profile";
import { usePageContext } from "vike-react/usePageContext";
import { useState, useEffect } from "react";
import { EllipsisVerticalIcon, XCircleIcon, LockOpenIcon, LockClosedIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../../store/hooks";
import { useMediaQuery } from "../../../../store/hooks";
import { navigate } from "vike/client/router";
import Dropdown from "../../../../components/Dropdown";
import { useOutsideClick } from "../../../../utils/outsideClick";
import Form from "./edit/Form";
import CardFooter from "../../../../components/CardFooter";
import { initDisplay } from "../../../../store/slices/collectionDisplay";
import Popup from "../../../../components/Popup";
import { dispatchResult } from "../../../../utils/dispatchResult";
import useColor from "../../../../utils/colors";
import Loading from "../../../../components/Loading";


const About = () => {
    const dispatch = useAppDispatch();
    const context = usePageContext();


    const highlight = useColor()

    const { data, error, isLoading } = useGetCollectionQuery(context.routeParams.collection);

    useEffect(() => {
        if (data) {
            dispatch(initDisplay(data));
        }

    }, [data])

    const [editCollection, setEditCollection] = useState(false);
    const [deleteCollection, setDeleteCollection] = useState(false);
    const [dropdown, setDropdown] = useState(false);

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
                            collection={context.routeParams.collection}
                            setDropdown={setDropdown}
                            setEditCollection={setEditCollection}
                            setDeleteCollection={setDeleteCollection}
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
                uid={context.routeParams.collection}
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
}

const Menu = ({ dropdown, collection, setDropdown, setEditCollection, setDeleteCollection }: MenuProps) => {
    const context = usePageContext();

    const [copied, setCopied] = useState(false);

    dispatchResult({
        type: "Link",
        action: "copied",
        success: copied
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
                const copiedResult = await copyContent(collection);
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
                    navigate(`/${context.routeParams.collection}/edit`);
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
    about?: string | void;
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
    const context = usePageContext();
    const isLG = useMediaQuery();

    const [performDelete, result] = useDeleteCollectionMutation();

    const submitDelete = () => {
        performDelete(context.routeParams.collection)
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
                onClick={submitDelete}
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
                        onClick={submitDelete}
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