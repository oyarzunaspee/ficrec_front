import logo from "../../../../assets/ao3.png"

const Transition = () => {
    return (
        <>
            <div id="transition"  className="hidden">
                <div className="flex h-screen bg-base absolute top-0 left-0 z-50 w-full justify-center items-center">
                    <img src={logo} className="animate-ping w-30 " alt="logo" />
                </div>
            </div>
        </>
    )
}

export default Transition;