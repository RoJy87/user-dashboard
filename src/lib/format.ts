export function formatFullName(u: {
  firstName: string;
  lastName: string;
  maidenName?: string;
}) {
  return `${u.firstName} ${u.lastName}`;
}

export function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export function maskCardNumber(card: string) {
  const digits = card.replace(/\D/g, "");
  if (digits.length < 4) return card;
  const last = digits.slice(-4);
  return `•••• •••• •••• ${last}`;
}
