import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["radio"];

const RadioButtonInput: FC<IPropsType> = ({
  containerClassName,
  name,
  options,
  size = "small",
  isRequired = false,
  requiredMessage = "",
}) => {
  const { control } = useFormContext();
  return (
    <div className={classNames("", containerClassName)}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: isRequired,
            message: requiredMessage,
          },
        }}
        render={({ field, fieldState: { error, invalid } }) => (
          <>
            <div
              className={classNames({
                "flex flex-1 flex-wrap gap-4": size === "small",
                "flex flex-1 flex-col gap-4": size === "large",
              })}
            >
              {options.map((val) => (
                <div
                  onClick={() => {
                    field.onChange(val.value);
                  }}
                  key={val.value}
                  className={classNames(
                    {
                      "bg-green-50": val.value === field.value,
                      "border border-red-700": !!error || invalid,
                    },
                    "p-3 rounded-md bg-white flex items-center cursor-pointer"
                  )}
                >
                  <div
                    className={classNames(
                      {
                        "w-5 h-5": size === "small",
                        "w-8 h-8": size === "large",
                      },
                      "rounded-full border border-green-700 bg-transparent mr-3 flex items-center justify-center"
                    )}
                  >
                    {val.value === field.value && (
                      <div
                        className={classNames(
                          {
                            "w-3 h-3": size === "small",
                            "w-6 h-6": size === "large",
                          },
                          "rounded-full bg-green-700"
                        )}
                      />
                    )}
                  </div>
                  <p
                    className={classNames(
                      {
                        "text-base": size === "small",
                        "text-lg md:text-xl": size === "large",
                      },
                      "text-black font-semibold"
                    )}
                  >
                    {val.label}
                  </p>
                </div>
              ))}
            </div>
            {(!!error || invalid) && (
              <p className="text-sm font-normal text-red-700 px-3">
                {error?.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default RadioButtonInput;
