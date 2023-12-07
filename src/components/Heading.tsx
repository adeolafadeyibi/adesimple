import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["heading"];

const Heading: FC<IPropsType> = ({ containerClassName, text }) => {
  return (
    <div className={classNames("", containerClassName)}>
      <h1 className="text-3xl md:text-6xl lg:text-8xl lg:leading-[110px] font-semibold text-white">{`${text}`}</h1>
    </div>
  );
};

export default Heading;
