import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["select"];

const SelectInput: FC<IPropsType> = ({
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
          <div className="flex flex-col flex-1 w-full">
            <div className="inline-block relative w-full">
              <select
                {...field}
                className={classNames(
                  {
                    "border-red-700": !!error || invalid,
                    "px-4 py-2 pr-8": size === "small",
                    "px-5 py-4 pr-8": size === "large",
                  },
                  "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500  rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                )}
              >
                {options.map((val) => (
                  <option key={val.value} value={val.value}>
                    {val.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {(!!error || invalid) && (
              <p className="text-sm font-normal text-red-700 px-3">
                {error?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SelectInput;
