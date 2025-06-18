import "./style.css";

import "./tailwind.css";

import logoUrl from "../assets/logo.svg";
import { Provider } from "react-redux";
import { createStore } from "../store/createStore";
import type { PageContext } from "vike/types";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={createStore({} as PageContext)}>
      <section className="min-h-screen px-10 lg:flex lg:flex-col bg-gray-300">
        <div className="pt-20 mb-10 flex flex-col items-center lg:flex-row lg:justify-center">
          <img src="../../../public/ao3.png" alt="" className="w-30" />
          <h1 className="font-mono tracking-widest text-white text-shadow-lg text-[2em] font-bold">
            FicRec
          </h1>
        </div>
        <div className="md:flex md:justify-center">
          {children}
        </div>
      </section>
    </Provider>
  );
}