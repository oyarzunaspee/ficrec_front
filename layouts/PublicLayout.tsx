import "./style.css";

import "./tailwind.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="bg-base min-h-screen pb-5">
            {children}
        </div>
    )
}