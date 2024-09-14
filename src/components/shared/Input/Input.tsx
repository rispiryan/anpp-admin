import { type CSSProperties, type ChangeEvent, forwardRef, useState, memo } from "react";

import "./Input.scss";

import { type TextFieldProps, TextField, MenuItem } from "@mui/material";
import cn from "classnames";

import EyeIcon from "../../icons/eye";

export interface ISelectOptions<T> {
  label: string;
  value: T;
}

export type InputProps<T> = {
  type?: "password" | "number" | "email" | "text" | "tel";
  selectedOption?: ISelectOptions<T>;
  options?: ISelectOptions<T>[];
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  errorMessage?: string | any;
  style?: CSSProperties;
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
  hasError?: boolean;
  regexp?: RegExp;
} & TextFieldProps;

const Input = ({
  autoComplete = "off",
  className = "",
  selectedOption,
  type = "text",
  errorMessage,
  multiline,
  hasError,
  options,
  regexp,
  ...rest
}: InputProps<any>) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      className={cn("password-autocomplete-disabler", "input-wrapper", className, { ["textarea-wrapper"]: multiline })}
      type={type === "password" && !show ? type : "text"}
      error={hasError || !!errorMessage}
      helperText={errorMessage}
      multiline={multiline}
      {...rest}
      InputProps={{
        endAdornment: options ? (
          <MenuItem className="select-input" value="">
            <TextField value={selectedOption} select>
              {options.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </MenuItem>
        ) : (
          type === "password" && (
            <MenuItem onClick={() => setShow(!show)} value="">
              <EyeIcon isCrossed={!show} />
            </MenuItem>
          )
        ),
        ...(rest?.InputProps && { ...rest.InputProps }),
      }}
      inputProps={{
        ...(rest?.inputProps && { ...rest.inputProps }),
        autoComplete,
      }}
      value={rest.value ?? null}
      {...(regexp
        ? {
            onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              if (rest?.onChange) {
                const value: string = e?.target?.value || "";
                rest.onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: value.replace(regexp, ""),
                  },
                });
              }
            },
          }
        : {})}
    />
  );
};

export default Object.assign(memo(forwardRef(Input)), { displayName: "Input" });
