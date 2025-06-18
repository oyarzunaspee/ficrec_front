import CardHead from "../../../../components/CardHead";
import Form from "./Form";


const New = () => {

    return (
        <section className="card">
            <CardHead
                title="New rec"
            />
            <div className="card-body">
                <Form />
            </div>
        </section>
    )
}

export default New;