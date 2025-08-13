"use client";
import AsideMenu from "@/components/AsideMenu";
import { useCategoriesQuery } from "@/entities/category/queries";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useCategoriesQuery();

  if (isLoading) return <>Loading…</>;
  if (isError || !data) return null;
  return <AsideMenu categories={data.data}>{children}</AsideMenu>;
}
