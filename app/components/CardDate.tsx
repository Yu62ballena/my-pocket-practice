import { CiClock2 } from "react-icons/ci";

type CardDateProps = {
  createdAt: Date | null;
}

function CardDate({createdAt}: CardDateProps) {
  return (
    <div className="flex items-center">
      <CiClock2 className="mr-1" />
      <span>
        {createdAt
          ? new Date(createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "日付データなし"}
      </span>
    </div>
  );
}

export default CardDate;
