import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../../layouts/AuthLayout";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",
  prerender: false,
  ssr: false,
  extends: vikeReact,
} satisfies Config;
