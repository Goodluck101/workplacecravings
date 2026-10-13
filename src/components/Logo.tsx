import Image from "next/image";
import { brandAssets, siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-16 w-auto", priority = false }: LogoProps) {
  const { src, width, height } = brandAssets.logo;

  return (
    <Image
      src={src}
      alt={siteConfig.name}
      width={width}
      height={height}
      priority={priority}
      className={`object-contain object-left ${className}`}
    />
  );
}
