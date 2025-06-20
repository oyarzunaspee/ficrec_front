import vikeReact from "vike-react/config";
import vikeReactRedux from "vike-react-redux/config";

export default {
  extends: [vikeReact, vikeReactRedux],
  prerender: true,
  ssr: true
}