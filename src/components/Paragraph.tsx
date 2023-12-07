import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["paragraph"];

const Paragraph: FC<IPropsType> = ({
  containerClassName,
  text,
  size = "small",
}) => {
  return (
    <div className={classNames("", containerClassName)}>
      <p
        className={classNames(
          {
            "leading-9 md:leading-10 lg:leading-[60px]": size === "large",
            "md:leading-7 lg:leading-10": size === "small",
          },
          "text-lg md:text-xl lg:text-2xl  font-semibold text-white"
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default Paragraph;
