"use client";
import AsideMenu from "@/components/AsideMenu";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWithAuth(
          "GET",
          "http://localhost:4000/categories"
        );
        setCategories(data);
      } catch (err) {
        console.error("Unauthorized, redirecting to /authorization", err);
        router.push("/authorization");
      }
    };

    load();
  }, [router]);

  return <AsideMenu categories={categories.data}>{children}</AsideMenu>;
}
