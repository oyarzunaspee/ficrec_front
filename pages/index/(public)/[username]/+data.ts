import { useConfig } from "vike-react/useConfig";

import type { PageContextServer } from "vike/types";
import type { User } from "../../../../utils/types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  // https://vike.dev/useConfig
  const config = useConfig();

  const username = pageContext.urlPathname.slice(2)

  const response = await fetch(`https://almondluu.pythonanywhere.com/v1/public/user/${username}`);
  let user = (await response.json()) as User;

  config({
    title: user.username,
  });

  user = minimize(user);

  return user;
};

function minimize(user: User): User {
  const { uid, username, avatar, bio, highlight, collections } = user;
  const minimizedUser = { uid, username, avatar, bio, highlight, collections };
  return minimizedUser;
}
