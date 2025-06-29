import { useConfig } from "vike-react/useConfig";

import type { PageContextServer } from "vike/types";
import type { PublicUser } from "../../../../utils/types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  // https://vike.dev/useConfig
  const config = useConfig();

  const username = pageContext.urlPathname.slice(2)

  const response = await fetch(`https://api.ficrec.top/v1/public/user/${username}`);
  let user = (await response.json()) as PublicUser;

  config({
    title: user.username,
  });

  user = minimize(user);

  return user;
};

function minimize(user: PublicUser): PublicUser {
  const { username, avatar, bio, highlight, collections } = user;
  const minimizedUser = { username, avatar, bio, highlight, collections };
  return minimizedUser;
}
