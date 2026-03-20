import { Heading } from "@babylonlabs-io/core-ui";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps {
  className?: string;
  titleClassName?: string;
  title?: string;
}

export function Section({
  className,
  titleClassName,
  title,
  children,
}: PropsWithChildren<SectionProps>) {
  return (
    <section className={className}>
      <Heading
        as="h3"
        variant="h5"
        className={twMerge(
          "mb-4 font-semibold capitalize text-accent-primary md:mb-6 md:leading-normal",
          titleClassName,
        )}
      >
        {title}
      </Heading>

      {children}
    </section>
  );
}
