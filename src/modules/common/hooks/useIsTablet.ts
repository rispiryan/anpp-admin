import { useMediaQuery } from "react-responsive";

import { breakPoints } from "../styles/media";

const useIsTablet = (): boolean => {
  const isTablet = useMediaQuery({
    query: `(min-width: ${breakPoints.tabletMinSize}) and (max-width: ${breakPoints.tabletMaxSize})`,
  });

  return isTablet;
};

export default useIsTablet;
