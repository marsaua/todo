import AsideMenu from "@/components/AsideMenu";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthorized = await fetchWithAuth(
    "GET",
    "http://localhost:4000/auth/is-authorized"
  );
  console.log(isAuthorized);
  if (!isAuthorized) {
    redirect("/login");
  }
  const categories = await fetchWithAuth(
    "GET",
    "http://localhost:4000/categories"
  );

  return <AsideMenu categories={categories.data}>{children}</AsideMenu>;
}
