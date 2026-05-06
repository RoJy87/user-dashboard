"use client";

import { AlertOctagon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // в проде здесь должен быть вызов в Sentry/аналог
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <AlertOctagon className="h-10 w-10 text-destructive" />
      <div>
        <h1 className="text-2xl font-semibold">Что-то пошло не так</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Непредвиденная ошибка. Попробуйте повторить запрос.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            id: {error.digest}
          </p>
        ) : null}
      </div>
      <Button onClick={reset}>Повторить</Button>
    </div>
  );
}
