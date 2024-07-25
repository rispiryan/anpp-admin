type TValue = undefined | string | number;

const buildParams = (params: Record<string, TValue[] | TValue | string | number>) => {
  const tempParams: string[] = [];

  Object.keys(params).forEach((eachParam) => {
    const value = params[eachParam];

    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((eachValue) => {
          if (eachValue !== undefined) {
            tempParams.push(`${eachParam}=${encodeURIComponent(eachValue.toString())}`);
          }
        });
      } else {
        tempParams.push(`${eachParam}=${encodeURIComponent(value.toString())}`);
      }
    }
  });

  if (tempParams?.length) {
    return `?${tempParams.join("&")}`;
  }

  return "";
};

export default buildParams;
