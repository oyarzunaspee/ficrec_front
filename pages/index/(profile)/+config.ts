import vikeReact from "vike-react/config";
import vikeReactRedux from "vike-react-redux/config";
import Layout from "../../../layouts/LayoutDefault";

export default {
  Layout,
  extends: [vikeReact, vikeReactRedux],
  prerender: false,
}