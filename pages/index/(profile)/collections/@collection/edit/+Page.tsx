import { usePageContext } from "vike-react/usePageContext";

import CardHead from "../../../../../../components/CardHead";
import Form from "./Form";

import { useGetCollectionQuery } from "../../../../../../store/api/profile";

const Page = () => {
    const { routeParams } = usePageContext();

    const { data, error, isLoading } = useGetCollectionQuery(routeParams.collection);

    if (!data) return null;


    return (
        <>
            <div className="card">
                <CardHead
                    title={`Edit collection ${data.name}`}
                />
                <div className="card-body">
                    <Form name={data.name} uid={routeParams.collection} privacy={data.private} about={data.about} />
                </div>
            </div>
        </>
    )
}

export default Page;