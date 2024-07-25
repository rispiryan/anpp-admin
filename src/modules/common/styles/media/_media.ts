import breakpoints from "./_media.module.scss";

// TODO: use https://github.com/ReactTraining/react-media
// and apply breakpoints from sass to component

export type Breakpoints = "tabletMaxSize" | "tabletMinSize";
export type BreakpointsMap = {
  [key in Breakpoints]: string;
};

export const getBreakpoints = (): BreakpointsMap => breakpoints as BreakpointsMap;

export default breakpoints as BreakpointsMap;
