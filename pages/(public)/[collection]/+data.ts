import type { PageContextServer } from "vike/types";
import type { PublicCollection } from "../../../utils/types";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  // https://vike.dev/useConfig
  const config = useConfig();

  const param = pageContext.urlPathname.match(/^\/@([\w|\d]+)\/([\w|\d|-]+)/)

  if (param != null) {
    const username = param[1]
    const uid = param[2]
  
    const response = await fetch(`https://almondluu.pythonanywhere.com/v1/public/user/${username}/collections/${uid}`);
    let collection = (await response.json()) as PublicCollection;
  
    config({
      title: collection.name,
    });

    collection = minimize(collection);
  
    return collection;

  }

};

function minimize(collection: PublicCollection): PublicCollection {
  const { reader, name, uid, about, fandom, ship, warnings, tags, summary, characters } = collection;
  const minimizedUser = { reader, uid, name, about, fandom, ship, warnings, tags, summary, characters };
  return minimizedUser;
}