import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <h1 className="text-2xl font-semibold">Страница не найдена</h1>
      <p className="text-sm text-muted-foreground">
        Похоже, такой ссылки у нас нет.
      </p>
      <Link href="/" className={buttonVariants()}>
        На главную
      </Link>
    </div>
  );
}
