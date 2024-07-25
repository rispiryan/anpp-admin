import { useMediaQuery } from "react-responsive";

import { breakPoints } from "../styles/media";

const useIsMobile = (): boolean => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakPoints.tabletMinSize})` });

  return isMobile;
};

export default useIsMobile;
