import React from "react";
import { Text } from "../../../../components/Text";
import { Hint } from "../../../../components/Hint";
import { Toggle } from "../../../../components/Toggle/Toggle";
import { twJoin } from "tailwind-merge";

export interface WalletMenuSettingItemProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  status: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  tooltip?: string;
  infoIcon?: React.ReactNode;
}

export const WalletMenuSettingItem: React.FC<WalletMenuSettingItemProps> = ({
  icon,
  title,
  status,
  value,
  onChange,
  className,
  tooltip,
  infoIcon,
}) => {
  return (
    <div className={twJoin("flex w-full items-center justify-between gap-2 p-3 md:mb-0 md:p-0", className)}>
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col">
          {infoIcon && tooltip ? (
            <Text as="span" variant="body2" className="font-medium text-accent-primary">
              {title}
              <Hint tooltip={tooltip} placement="bottom" attachToChildren={true} offset={[20, 8]}>
                <span className="ml-1 inline-block cursor-pointer align-middle text-secondary-strokeDark">
                  {infoIcon}
                </span>
              </Hint>
            </Text>
          ) : (
            <Hint tooltip={tooltip} attachToChildren={!!tooltip} placement="bottom">
              <Text as="span" variant="body2" className="font-medium text-accent-primary">
                {title}
              </Text>
            </Hint>
          )}
          <Text className="!text-xs text-accent-secondary">{status}</Text>
        </div>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
};
