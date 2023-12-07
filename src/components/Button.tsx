import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["button"];

const Button: FC<IPropsType> = ({ containerClassName, text, link }) => {
  return (
    <div className={classNames("", containerClassName)}>
      <a className="no-underline" href={link} target="_blank">
        <div className="py-3 px-7 bg-white rounded-sm cursor-pointer hover:bg-green-50">
          <p className="mb-0 text-base font-semibold text-green-800">{text}</p>
        </div>
      </a>
    </div>
  );
};

export default Button;
