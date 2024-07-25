import { useContext } from "react";

import { UserContext } from "@modules/User/UserProvider";

export const useUser = () => {
  const user = useContext(UserContext);

  return user;
};
