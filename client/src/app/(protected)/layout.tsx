"use client";
import AsideMenu from "@/components/AsideMenu";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = { title: string; color: string; id: number };

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoriesResponse, setCategoriesResponse] = useState<{
    data: Category[];
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data: Category[] = await fetchWithAuth("GET", "/categories");
        if (data) {
          setCategoriesResponse({ data });
        }
      } catch (err) {
        console.error("Unauthorized, redirecting to /authorization", err);
        router.push("/authorization");
      }
    };

    load();
  }, [router]);

  return (
    <AsideMenu categories={categoriesResponse?.data || []}>
      {children}
    </AsideMenu>
  );
}
