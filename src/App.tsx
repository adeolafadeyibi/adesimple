import { Fragment, useState } from "react";
import heroImg from "@assets/images/hero.png";
import girlBg from "@assets/images/girlBg.png";
import classNames from "classnames";
import { useForm, FormProvider } from "react-hook-form";
import { ElementTypeMap, IStepType } from "@definedTypes/steps.types";
import elementsList from "@components/elements.config";
import { find, keys, pickBy } from "lodash";
import emailjs from "@emailjs/browser";
import SpinnerSvg from "@assets/icons/SpinnerSvg";
import {
  emailJsPublicKey,
  emailJsServiceId,
  emailJsTemplateId,
} from "./config";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(steps[0]?.id);
  const [prevCompletedSteps, setPrevCompletedSteps] = useState<string[]>([]);

  const methods = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const newValues = pickBy(data, (val) => !!val);

    const step = find(steps, { id: currentStep });

    const oldObject = window.localStorage.getItem("formData");

    const oldData = oldObject ? JSON.parse(oldObject) : {};

    const newData = {
      ...oldData,
      ...newValues,
    };

    if (step?.isFinalStep) {
      let newMessage = ``;

      keys(newData).map((val) => {
        newMessage =
          newMessage +
          `
          ${val}: ${newData[val]}
        `;
      });
      setLoading(true);

      emailjs
        .send(
          emailJsServiceId,
          emailJsTemplateId,
          { message: newMessage },
          emailJsPublicKey
        )
        .then((res) => {
          if (res.text === "OK") {
            window.localStorage.removeItem("formData");
            window.location.reload();
          } else {
            alert(res.text);
          }
        })
        .catch((err) => {
          alert(err);
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      let nexStep: string = "";

      if (step?.nextStepId) {
        nexStep = step?.nextStepId;
      } else {
        const firstOptionElem = find(
          step?.elements ?? [],
          (val) => val.type === "radio" || val.type === "select"
        ) as ElementTypeMap["radio"] | ElementTypeMap["select"];

        if (firstOptionElem) {
          const selectedOption =
            newData[firstOptionElem?.name as keyof typeof newData];
          if (selectedOption) {
            nexStep = find(firstOptionElem?.options, {
              value: selectedOption,
            })?.nextStepId as string;
          }
        }
      }

      if (nexStep) {
        window.localStorage.setItem("formData", JSON.stringify(newData));
        setPrevCompletedSteps([...prevCompletedSteps, currentStep]);
        setTimeout(() => {
          setCurrentStep(nexStep);
        }, 0);
      } else {
        alert("Please select option of first question for next step!");
      }
    }
  };

  const step = find(steps, { id: currentStep });

  return (
    <div className="w-screen h-screen absolute z-10 bg-black">
      <div
        className="h-full w-full fixed top-0 left-0 right-0 bottom-0 bg-no-repeat bg-right-top -z-10"
        style={{
          backgroundImage: `url(${step?.bg})`,
          backgroundSize: "100% 100%",
          backgroundAttachment: "fixed",
        }}
      />
      <p className="text-lg font-semibold text-white absolute top-3 left-6">{`Step ${
        prevCompletedSteps?.length + 1
      }`}</p>
      <FormProvider {...methods}>
        <form
          className="w-full h-full flex flex-col flex-1"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className={classNames("py-20", step?.containerClassName)}>
            {step?.elements?.map((val) => {
              const foundElement = elementsList.find(
                (el) => el.type === val.type
              );

              if (!foundElement) {
                return <Fragment key={val.id} />;
              }

              return <foundElement.Component key={val.id} {...val} />;
            })}
          </div>
          <div className="px-5 md:px-12 flex items-center justify-between pb-16">
            <button
              type="button"
              disabled={isLoading}
              className={classNames(
                {
                  invisible: !prevCompletedSteps?.length,
                },
                "text-lg font-semibold text-white cursor-pointer"
              )}
              onClick={() => {
                const newArr = [...prevCompletedSteps];
                const lastStep = newArr.pop();
                if (lastStep) {
                  setCurrentStep(lastStep);
                }
                setPrevCompletedSteps(newArr);
              }}
            >{`< Back >`}</button>
            <button
              disabled={isLoading}
              className="text-lg font-semibold text-white cursor-pointer"
              type="submit"
            >
              {isLoading ? (
                <SpinnerSvg />
              ) : (
                <>{step?.isFinalStep ? `<Save>` : `< Save & Next >`}</>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;

// You can Add As Many Steps as you want with this approach.

// in each step there would be elements of different SVGUnitTypes. right now they are only Heading, Paragraph, input, select, radio button  videoplayer and button.

// in each step there is bg to add background Image

// if element is of form type then you have to add a field as name. this should be unique. otherwise different fields with same name there value won't be as expected. Also in email I'm sending data against each name

// to add validation of required for each form element there is isRequired and requiredMessage keys. I can add more validation rules whatever you'd need. let me know

// For next step if there is not condition for next step. you can add next step id in nextStepId variable for each step.if you wanna add condition based on option. then on first option question you can add nextStepId for each option. Keep in mind if step is not final then nextStepId is compulsory. it either should be on step level or on option level.

// as based on condition steps. final step can be multiple on based on conditions. so on which step you wanna submit the form. you have to add a variable isLastStep to true.

const steps: IStepType[] = [
  {
    id: "1",
    bg: heroImg,
    containerClassName: "max-w-5xl px-5 md:px-12 flex flex-col flex-1",
    elements: [
      {
        id: "1",
        type: "heading",
        containerClassName: "text-end mb-8 lg:max-w-[820px]",
        text: "Let Me Help You Prepare For Your Love",
      },
      {
        id: "2",
        type: "paragraph",
        containerClassName: "mb-8",
        text: "I'm a matchmaker and date coach with over a decade of success. In today's busy world, I find the right partner for professionals who lack time for dating. Trust me to help you discover love without giving up.",
        size: "large",
      },
      {
        id: "3",
        type: "radio",
        name: "interest",
        containerClassName: "mb-8",
        size: "small",
        isRequired: true,
        requiredMessage: "Please select your interest",
        options: [
          {
            value: "I'm A Man Seeking A Woman",
            label: "I'm A Man Seeking A Woman",
            nextStepId: "2",
          },
          {
            value: "I'm A Woman Seeking A Man",
            label: "I'm A Woman Seeking A Man",
            nextStepId: "3",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    containerClassName:
      "max-w-5xl lg:pl-[350px] px-5 md:px-12 flex flex-col flex-1",
    bg: girlBg,
    nextStepId: "4",
    elements: [
      {
        id: "1",
        type: "video",
        containerClassName: "mb-16",
        videoId: "jTuiOcx0XBg",
      },
      {
        id: "3",
        type: "paragraph",
        containerClassName: "mb-5 ",
        text: "I Would Like To Book A Virtual Matchmaking Assessment In Hopes Of QualifyingTo Be Matched",
      },
      {
        id: "4",
        type: "paragraph",
        containerClassName: "mb-5 ",
        text: "Coming after selecting I'm a man!",
      },
      {
        id: "5",
        type: "button",
        containerClassName: "mb-5 flex items-center justify-end",
        text: "Book Now",
        link: "",
      },
    ],
  },
  {
    id: "3",
    containerClassName:
      "max-w-5xl lg:pl-[350px] px-5 md:px-12 flex flex-col flex-1",
    bg: girlBg,
    nextStepId: "4",
    elements: [
      {
        id: "1",
        type: "video",
        containerClassName: "mb-16",
        videoId: "jTuiOcx0XBg",
      },
      {
        id: "3",
        type: "paragraph",
        containerClassName: "mb-5 ",
        text: "I Would Like To Book A Virtual Matchmaking Assessment In Hopes Of QualifyingTo Be Matched",
      },
      {
        id: "4",
        type: "paragraph",
        containerClassName: "mb-5 ",
        text: "Coming after selecting I'm a Woman!",
      },
      {
        id: "5",
        type: "button",
        containerClassName: "mb-5 flex items-center justify-end",
        text: "Book Now",
        link: "",
      },
    ],
  },
  {
    id: "4",
    containerClassName:
      "max-w-5xl lg:pl-[350px] px-5 md:px-12 flex flex-col flex-1",
    bg: girlBg,
    isFinalStep: true,
    elements: [
      {
        id: "1",
        type: "video",
        containerClassName: "mb-8",
        videoId: "jTuiOcx0XBg",
      },
      {
        id: "2",
        type: "paragraph",
        containerClassName: "mb-5",
        text: "I'm A Single Woman And I Need Help",
      },
      {
        id: "3",
        type: "radio",
        name: "help",
        size: "large",
        options: [
          {
            value: "Finding A Man",
            label: "Finding A Man",
          },
          {
            value: "Keeping A Man",
            label: "Keeping A Man",
          },
          {
            value: "Getting Married",
            label: "Getting Married",
          },
        ],
      },
    ],
  },
];
