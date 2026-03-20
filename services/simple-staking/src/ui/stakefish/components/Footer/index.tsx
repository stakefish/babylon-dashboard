import { Footer as FooterComponent, SocialLinkProps } from "@stakefish/ui-kit";
import { useIsMobile } from "@babylonlabs-io/core-ui";

const CURRENT_YEAR = new Date().getFullYear();
const MAIN_WEBSITE_URL = "https://stake.fish";

const links = [
  {
    url: `${MAIN_WEBSITE_URL}/terms-of-service`,
    title: "Terms of service",
  },
  {
    url: `${MAIN_WEBSITE_URL}/privacy-policy`,
    title: "Privacy policy",
  },
  {
    url: `${MAIN_WEBSITE_URL}/contact`,
    title: "Contact us",
  },
];
const socialLinks: SocialLinkProps[] = [
  {
    icon: "twitter",
    url: "https://x.com/stakefish",
    title: "Twitter",
  },
  {
    icon: "telegram",
    url: "https://t.me/stakefish",
    title: "Telegram",
  },
  {
    icon: "youTube",
    url: "https://www.youtube.com/c/stakefish",
    title: "YouTube",
  },
  {
    icon: "medium",
    url: "https://medium.com/stakefish",
    title: "Medium",
  },
  {
    icon: "instagram",
    url: "https://instagram.com/stake.fish",
    title: "Instagram",
  },
  {
    icon: "linkedIn",
    url: "https://www.linkedin.com/company/stakefish",
    title: "LinkedIn",
  },
  {
    icon: "reddit",
    url: "https://www.reddit.com/r/stakefish",
    title: "Reddit",
  },
];

export const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <FooterComponent
      simple
      fixed
      socials={socialLinks}
      links={links}
      currentYear={CURRENT_YEAR}
      isMd={!isMobile}
    />
  );
};
