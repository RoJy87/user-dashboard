import { UserDetail } from "@/components/user-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: PageProps) {
  const { id } = await params;
  return <UserDetail id={id} />;
}
