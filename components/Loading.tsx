import { ArrowPathIcon } from "@heroicons/react/24/solid"

const Loading = ({ color }: { color?: string }) => {

    return (
        <>
            <div className="flex justify-center mt-10">
                <ArrowPathIcon className={`size-9 animate-spin ${color ? color : "text-hover"}`} />
            </div>
        </>
    )
}

export default Loading;