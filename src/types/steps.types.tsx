import React from "react";

type IOptionsType = {
  value: string;
  label: string;
  nextStepId?: string;
};

export type ElementTypeMap = {
  heading: {
    type: "heading";
    text: string;
  };
  paragraph: {
    type: "paragraph";
    text: string;
    size?: "small" | "large";
  };
  input: {
    type: "input";
    name: string;
    placeholder?: string;
    size?: "small" | "large";
    isRequired?: boolean;
    requiredMessage?: string;
  };
  select: {
    type: "select";
    name: string;
    size?: "small" | "large";
    options: IOptionsType[];
    isRequired?: boolean;
    requiredMessage?: string;
  };
  radio: {
    type: "radio";
    name: string;
    size?: "small" | "large";
    options: IOptionsType[];
    isRequired?: boolean;
    requiredMessage?: string;
  };
  button: {
    type: "button";
    text: string;
    size?: "small" | "large";
    link: string;
  };
  video: {
    type: "video";
    videoId: string;
  };
};

export type IElementType = {
  id: string;
  containerClassName?: React.HTMLProps<HTMLElement>["className"];
} & ElementTypeMap[keyof ElementTypeMap];

export interface IStepType {
  id: string;
  bg: string;
  containerClassName?: React.HTMLProps<HTMLElement>["className"];
  nextStepId?: string;
  isFinalStep?: boolean;
  elements: IElementType[];
}
