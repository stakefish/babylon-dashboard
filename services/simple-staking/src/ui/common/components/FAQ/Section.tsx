import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Text,
} from "@babylonlabs-io/core-ui";
import { ReactNode } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface SectionProps {
  title: string;
  content: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, content }) => {
  return (
    <div>
      <Accordion className="text-primary-dark">
        <AccordionSummary
          renderIcon={(expanded) =>
            expanded ? (
              <AiOutlineMinus size={24} />
            ) : (
              <AiOutlinePlus size={24} />
            )
          }
        >
          <div className="pr-8">
            <span className="align-middle">{title}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="p-2" unmountOnExit>
          <Text as="div">{content}</Text>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
