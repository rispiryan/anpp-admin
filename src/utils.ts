export enum DateFormat {
  DDMMYYYY = "dd/mm/yyyy",
  MMDDYYYY = "mm/dd/yyyy",
  YYYYMMDD = "yyyy-mm-dd",
}

export const formatDate = (date: string | Date, format: DateFormat = DateFormat.DDMMYYYY) => {
  if (!date) {
    return null;
  }

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const options: Intl.DateTimeFormatOptions = {
    minute: "numeric",
    second: "numeric",
    month: "numeric",
    hour: "numeric",
    year: "numeric",
    day: "numeric",
    hour12: false, // 24-hour format (no AM/PM)
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    minute: "numeric",
    second: "numeric",
    hour: "numeric",
    hour12: false, // 24-hour time format
  };

  const datesFormat = {
    [DateFormat.YYYYMMDD]: `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString("en-US", timeOptions)}`,
    [DateFormat.DDMMYYYY]: date.toLocaleDateString("en-GB", options).replace(/\//g, "."),
    [DateFormat.MMDDYYYY]: date.toLocaleDateString("en-US", options).replace(/\//g, "."),
  };

  return datesFormat[format];
};

type DirtyFields = Record<string, boolean>;

export const convertDataForUpdate = <T extends object>(data: T, dirtyFields: DirtyFields): Partial<T> => {
  const newData: Partial<T> = {};
  const fields = Object.keys(dirtyFields) as (keyof T)[];

  fields.forEach((field) => {
    if (field in data) {
      newData[field] = data[field];
    }
  });

  return newData;
};
