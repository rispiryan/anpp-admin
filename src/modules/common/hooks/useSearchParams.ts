import { useCallback, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export type TParams<T = string> = { [key: string]: T };
export type TSetParams = undefined | boolean | string | number | null;

const getParams = (search: string) => {
  const queryParams = search ? search.slice(1).split("&") : [];
  const tempSearchParams: TParams<TSetParams[] | TSetParams> = {};

  queryParams.forEach((eachParam) => {
    const [key, value] = eachParam.split("=");

    if (Object.hasOwn(tempSearchParams, key)) {
      if (Array.isArray(tempSearchParams[key])) {
        (tempSearchParams[key] as TSetParams[]).push(value);
      } else {
        tempSearchParams[key] = [decodeURIComponent(tempSearchParams[key] as string) as TSetParams, value];
      }
    } else {
      tempSearchParams[key] = decodeURIComponent(value);
    }
  });

  return tempSearchParams;
};

export const useSearchParams = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => getParams(search), [search]);

  const setSearchParam = useCallback(
    (params: TParams<TSetParams[] | TSetParams>) => {
      const tempParams: string[] = [];
      const mergedParams: TParams<TSetParams[] | TSetParams> = { ...searchParams, ...params };

      Object.keys(mergedParams).forEach((eachParam) => {
        const value = mergedParams[eachParam];

        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((eachValue) => {
              if (eachValue !== undefined && eachValue !== null) {
                tempParams.push(`${eachParam}=${eachValue.toString()}`);
              }
            });
          } else {
            tempParams.push(`${eachParam}=${encodeURIComponent(value.toString())}`);
          }
        }
      });

      if (tempParams?.length) {
        const query = `?${tempParams.join("&")}`;

        navigate(`${pathname}${query}`);
      } else {
        navigate(`${pathname}`);
      }
    },
    [searchParams, navigate, pathname],
  );

  return { setSearchParam, searchParams };
};
