import { Banknote, CreditCard, Globe, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { maskCardNumber } from "@/lib/format";
import type { User } from "@/lib/types";
import { Row, SectionCard } from "./section-card";

export function FinanceCard({ user }: { user: User }) {
  return (
    <SectionCard title="Финансы" icon={<Banknote className="h-4 w-4" />}>
      <Row icon={<CreditCard className="h-3.5 w-3.5" />} label="Карта">
        <span className="font-mono text-xs">
          {maskCardNumber(user.bank.cardNumber)}
        </span>{" "}
        · {user.bank.cardType} · до {user.bank.cardExpire}
      </Row>
      <Row label="Валюта">{user.bank.currency}</Row>
      <Row icon={<Hash className="h-3.5 w-3.5" />} label="IBAN">
        <span className="font-mono text-xs break-all">{user.bank.iban}</span>
      </Row>
      <Separator className="my-2" />
      <Row icon={<Globe className="h-3.5 w-3.5" />} label="Крипто">
        {user.crypto.coin} ({user.crypto.network})
      </Row>
      <Row label="Кошелёк">
        <span className="font-mono text-xs break-all">
          {user.crypto.wallet}
        </span>
      </Row>
    </SectionCard>
  );
}
