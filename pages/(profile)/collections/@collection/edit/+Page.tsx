import { usePageContext } from "vike-react/usePageContext";
import CardHead from "../../../../../components/CardHead";
import Form from "./Form";
import { useGetCollectionQuery } from "../../../../../store/api/profile";

const Edit = () => {
    const context = usePageContext();

    const { data, error, isLoading } = useGetCollectionQuery(context.routeParams.collection);

    if (!data) return null;


    return (
        <>
            <div className="card">
                <CardHead
                    title={`Edit collection ${data.name}`}
                />
                <div className="card-body">
                    <Form name={data.name} uid={context.routeParams.collection} privacy={data.private} about={data.about} />
                </div>
            </div>
        </>
    )
}

export default Edit;