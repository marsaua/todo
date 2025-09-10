"use client";
import AsideMenu from "@/components/AsideMenu";
import { useCategoriesQuery } from "@/entities/category/queries";
import { useCurrentUser } from "@/entities/user/queries";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useCategoriesQuery();

  const { data: currentUser } = useCurrentUser();
  const user = currentUser?.data;

  if (isLoading) return <>Loading…</>;
  if (isError || !data) return null;
  return (
    <AsideMenu categories={data.data} userName={user?.name}>
      {children}
    </AsideMenu>
  );
}
