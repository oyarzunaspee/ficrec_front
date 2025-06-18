import { usePageContext } from "vike-react/usePageContext";
import { useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "../../store/hooks";
import useColor from "../../utils/colors";

type CollectionData = {
    name: string;
    uid: string;
    recs: number;
    private: boolean;
}

const ColletionList = ({ collections }: { collections: Array<CollectionData> }) => {
    const context = usePageContext()

    const privacyTab = useAppSelector((state) => state.privacyTab.value);
    const highlight = useColor()

    const isLG = useMediaQuery();

    if (isLG) {
        return (
            <>
                <section className="border-t ml-5 border-l border-hover">
                    {collections.map((col) => {
                        if (col.private == privacyTab) {
                            return (
                                <a key={col.uid} href={`/collections/${col.uid}`}>
                                    <div key={col.uid} className="cursor-pointer py-3 px-10 text-sm border-b rounded-none border-gray-100 hover:bg-hover">
                                        <div className="flex justify-between items-center">
                                            <h2 className={context.routeParams.collection == col.uid ? highlight.text : "text-secondary"}>
                                                {col.name}
                                            </h2>
                                            <span className={context.routeParams.collection == col.uid ? highlight.text : "text-primary"}>
                                                {col.recs}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            )
                        }
                    })
                }
                </section>
            </>
        )
    }
}

export default ColletionList;