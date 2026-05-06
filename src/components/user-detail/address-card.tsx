import { Info, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { User } from "@/lib/types";
import { Row, SectionCard } from "./section-card";

export function AddressCard({ user }: { user: User }) {
  const { lat, lng } = user.address.coordinates;
  const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`;

  return (
    <SectionCard
      title="Адрес"
      icon={<MapPin className="h-4 w-4" />}
      action={
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            variant: "link",
            size: "sm",
            className: "h-auto px-0",
          })}
        >
          Открыть на карте
        </a>
      }
    >
      <Row label="Улица">{user.address.address}</Row>
      <Row label="Город">{user.address.city}</Row>
      <Row label="Штат/регион">
        {user.address.state}
        {user.address.stateCode ? ` (${user.address.stateCode})` : ""}
      </Row>
      <Row label="Индекс">{user.address.postalCode}</Row>
      <Row label="Страна">{user.address.country}</Row>
      <Row label="Координаты">
        <span className="font-mono text-xs">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
      </Row>
      <p className="flex items-start gap-1.5 pt-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3 w-3 shrink-0" />
        <span>
          Координаты в dummyjson.com генерируются случайно и не соответствуют
          адресу — точка на карте может оказаться где угодно.
        </span>
      </p>
    </SectionCard>
  );
}
