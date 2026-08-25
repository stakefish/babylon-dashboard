import { DashboardFooter, constants } from "@stakefish/ui-kit";

const links = [
  {
    url: `${constants.MAIN_WEBSITE_URL}/terms-of-service`,
    title: "Terms of service",
  },
  {
    url: `${constants.MAIN_WEBSITE_URL}/privacy-policy`,
    title: "Privacy policy",
  },
  {
    url: `${constants.MAIN_WEBSITE_URL}/contact`,
    title: "Contact us",
  },
];

export const Footer = () => {
  return <DashboardFooter links={links} />;
};
