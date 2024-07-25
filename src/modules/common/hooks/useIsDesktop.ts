import useIsTablet from "./useIsTablet";
import useIsMobile from "./useIsMobile";

const useIsDesktop = (): boolean => {
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  return !(isTablet || isMobile);
};

export default useIsDesktop;
