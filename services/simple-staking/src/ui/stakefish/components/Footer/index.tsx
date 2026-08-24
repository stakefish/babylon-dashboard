import { Footer as FooterComponent, SocialLinkProps } from "@stakefish/ui-kit";
import {
  Instagram,
  LinkedIn,
  Medium,
  Reddit,
  Telegram,
  Twitter,
  YouTube,
} from "@stakefish/ui-kit/icons";

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
    icon: Twitter,
    url: "https://x.com/stakefish",
    title: "Twitter",
  },
  {
    icon: Telegram,
    url: "https://t.me/stakefish",
    title: "Telegram",
  },
  {
    icon: YouTube,
    url: "https://www.youtube.com/c/stakefish",
    title: "YouTube",
  },
  {
    icon: Medium,
    url: "https://medium.com/stakefish",
    title: "Medium",
  },
  {
    icon: Instagram,
    url: "https://instagram.com/stake.fish",
    title: "Instagram",
  },
  {
    icon: LinkedIn,
    url: "https://www.linkedin.com/company/stakefish",
    title: "LinkedIn",
  },
  {
    icon: Reddit,
    url: "https://www.reddit.com/r/stakefish",
    title: "Reddit",
  },
];

export const Footer = () => {
  return (
    <FooterComponent
      simple
      fixed
      socials={socialLinks}
      links={links}
      currentYear={CURRENT_YEAR}
    />
  );
};
