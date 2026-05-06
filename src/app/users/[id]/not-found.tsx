import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <h1 className="text-2xl font-semibold">Пользователь не найден</h1>
      <p className="text-sm text-muted-foreground">
        Возможно, он был удалён или ссылка неверна.
      </p>
      <Link href="/" className={buttonVariants()}>
        Вернуться к списку
      </Link>
    </div>
  );
}
