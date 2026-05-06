import { Suspense } from "react";
import { KpiCards } from "@/components/kpi-cards";
import { UsersSection } from "@/components/users-section";

export default function HomePage() {
  return (
    <div className='space-y-8'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Обзор</h1>
        <p className='mt-1 text-sm text-muted-foreground'>
          Сводная статистика и список пользователей. Данные подтягиваются с dummyjson.com/users.
        </p>
      </header>

      <KpiCards />

      <Suspense fallback={null}>
        <UsersSection />
      </Suspense>
    </div>
  );
}
