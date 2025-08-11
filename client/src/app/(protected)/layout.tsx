"use client";
import AsideMenu from "@/components/AsideMenu";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = { title: string; color: string; id: number };
type CategoriesResponse = {
  data: {
    data: Category[];
  };
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoriesResponse, setCategoriesResponse] =
    useState<CategoriesResponse | null>(null);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data: CategoriesResponse = await fetchWithAuth(
          "GET",
          "categories"
        );
        if (data.data) {
          setCategoriesResponse(data);
        }
      } catch (err) {
        console.error("Unauthorized, redirecting to /authorization", err);
        router.push("/authorization");
      }
    };

    load();
  }, [router]);

  return (
    <AsideMenu categories={categoriesResponse?.data.data || []}>
      {children}
    </AsideMenu>
  );
}
