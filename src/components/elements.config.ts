import { ElementTypeMap } from "@definedTypes/steps.types";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import RadioButtonInput from "./RadioButtonInput";
import VideoPlayer from "./VideoPlayer";
import Button from "./Button";
import Textfield from "./Textfield";
import SelectInput from "./SelectInput";

interface IComponentType {
  type: keyof ElementTypeMap;
  Component: any;
}

const elementsList: IComponentType[] = [
  {
    type: "heading",
    Component: Heading,
  },
  {
    type: "paragraph",
    Component: Paragraph,
  },
  {
    type: "radio",
    Component: RadioButtonInput,
  },
  {
    type: "video",
    Component: VideoPlayer,
  },
  {
    type: "button",
    Component: Button,
  },
  {
    type: "input",
    Component: Textfield,
  },
  {
    type: "select",
    Component: SelectInput,
  },
];

export default elementsList;
