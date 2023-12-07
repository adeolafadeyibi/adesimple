import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["input"];

const Textfield: FC<IPropsType> = ({
  containerClassName,
  name,
  placeholder,
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
            <input
              {...field}
              className={classNames(
                {
                  "py-2 px-3": size === "small",
                  "py-4 px-5": size === "large",
                  "border-red-700": !!error || invalid,
                },
                "shadow appearance-none border rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              )}
              type="text"
              placeholder={placeholder}
            />
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

export default Textfield;
