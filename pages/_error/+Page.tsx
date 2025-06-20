import { usePageContext } from "vike-react/usePageContext";

import "../../layouts/style.css";

import { FaceFrownIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const { is404 } = usePageContext();
  if (is404) {
    return (
      <>
        <div className="min-h-screen bg-base flex justify-center items-center">
          <div>
            <FaceFrownIcon className="size-20 ml-5 text-secondary" />
            <h2 className="text-secondary text-xl">
              Page not found
            </h2>
            <div className="mt-5 text-dull hover:underline">
              <a href="/">
                <h2 className="text-lg flex justify-center items-center">
                  <ArrowUturnLeftIcon className="size-6 mr-2" />
                  go back
                </h2>
              </a>
            </div>
          </div>

        </div>
      </>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-base flex justify-center items-center">
        <h2 className="text-xl text-secondary">
          Something went wrong
        </h2>
      </div>
    </>
  );
}
