import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function BackLink() {
  return (
    <Link
      href="/"
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
        className: "-ml-2",
      })}
    >
      <ArrowLeft className="mr-1 h-4 w-4" />К списку
    </Link>
  );
}
