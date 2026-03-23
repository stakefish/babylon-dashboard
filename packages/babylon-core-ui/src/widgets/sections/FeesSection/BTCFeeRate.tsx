import { FeeItem } from "../../../components/FeeItem/FeeItem";
import { Button } from "../../../components/Button";
import { FaPen } from "react-icons/fa6";

interface BTCFeeRateProps {
  value: number | string;
  onEdit?: () => void;
  title?: string;
  className?: string;
}

export function BTCFeeRate({ value, onEdit, title = "Network Fee Rate", className }: BTCFeeRateProps) {
  return (
    <FeeItem title={title} className={className}>
      <span>{value} sats/vB</span>

      {onEdit && (
        <Button size="small" variant="outlined" className="size-6 pl-1" onClick={onEdit}>
          <FaPen size={16} />
        </Button>
      )}
    </FeeItem>
  );
}
