import Image from "next/image";

export default function AdventistLogo({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src="/adventist-logo.png"
        alt="Seventh-day Adventist Church Official Emblem"
        fill
        sizes="48px"
        className="object-contain"
        priority
      />
    </div>
  );
}