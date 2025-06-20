import Form from "./Form";
import CardHead from "../../../../components/CardHead";


const Page = () => {

    return (
        <section className="card">
            <CardHead
                title="New collection"
            />
            <div className="card-body">
                <Form />
            </div>
        </section>
    )
}

export default Page;