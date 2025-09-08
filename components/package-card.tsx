import { cn } from "@/lib/utils";

interface PackageCardProps {
  title: string;
  price: number;
  speed: number;
  features: string[];
  popular?: boolean;
  color?: "silver" | "gold" | "platinum" | "diamond";
}

const colorVariants = {
  silver: {
    bg: "bg-primary/10",
    accent: "text-primary",
    button: "border border-primary/40 text-primary hover:bg-primary/10",
  },
  gold: {
    bg: "bg-yellow-50",
    accent: "text-yellow-600",
    button: "border border-yellow-400 text-yellow-600 hover:bg-yellow-50",
  },
  platinum: {
    bg: "bg-gray-50",
    accent: "text-gray-600",
    button: "border border-gray-400 text-gray-600 hover:bg-gray-50",
  },
  diamond: {
    bg: "bg-blue-50",
    accent: "text-blue-600",
    button: "border border-blue-400 text-blue-600 hover:bg-blue-50",
  },
};

export default function PackageCard({
  title,
  price,
  speed,
  features,
  popular = false,
  color = "silver",
}: PackageCardProps) {
  const styles = colorVariants[color];

  return (
    <div
      className={cn(
        "rounded-xl shadow-sm overflow-hidden p-4 w-full max-w-sm transition-all duration-300 hover:shadow-md",
        styles.bg,
        popular && "ring-2 ring-primary"
      )}
    >
      {popular && (
        <div className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block">
          Most Popular
        </div>
      )}

      <h3 className="text-lg font-semibold text-neutral-700 mb-2 font-inter flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.accent}
        >
          <path
            d="M17 3C16.316 5.472 15.435 6.3165 13 7C15.435 7.6835 16.316 8.528 17 11C17.684 8.528 18.565 7.6835 21 7C18.565 6.3165 17.684 5.472 17 3ZM10 7C8.8025 11.3255 7.262 12.804 3 14C7.262 15.196 8.8025 16.6745 10 21C11.1975 16.6745 12.738 15.196 17 14C12.738 12.804 11.1975 11.3255 10 7Z"
            fill="currentColor"
          />
        </svg>
        {title}
      </h3>

      <div className="text-[32px] font-normal mb-1 font-montserrat">
        <span className={`${styles.accent} font-normal text-[32px]`}>
          ৳ {price}
        </span>
        <span className="text-sm text-gray-500"> /month</span>
      </div>

      <div className="bg-white rounded-[8px] p-4 mt-4 space-y-3 shadow-sm">
        <div className="text-sm text-gray-600 font-semibold font-inter">
          YOU GET:
        </div>

        <div className="text-sm text-gray-700 flex items-center gap-2">
          <span className="text-gray-700 font-semibold font-inter">Speed:</span>
          <span className={`font-bold ${styles.accent} text-[18px] font-kalam`}>
            {speed} Mbps
          </span>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start text-sm gap-2 text-gray-700"
          >
            <span className={styles.accent}>●</span>
            <span className="font-inter text-sm font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={cn(
          "mt-4 w-full py-2 text-[16px] font-inter font-semibold rounded-[8px] transition-all",
          styles.button
        )}
      >
        Buy Package
      </button>
    </div>
  );
}
