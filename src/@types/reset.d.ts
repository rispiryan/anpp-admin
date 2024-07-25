import "@total-typescript/ts-reset";
import "@tanstack/react-query";

import { type IError } from "@modules/types";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<IError>;
  }
}
