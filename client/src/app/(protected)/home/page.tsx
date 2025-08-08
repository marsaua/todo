import ToDoList from "@/components/ToDoList";

type Props = {
  page?: string;
  limit?: string;
};

export default async function HomePage(searchParams: Props) {
  const { page, limit } = await searchParams;
  const pageInt = Number(page ?? "1");
  const limitInt = Number(limit ?? "5");
  console.log(pageInt);
  console.log(limitInt);
  // const page = parseInt(searchParams?.page || "1");
  // const limit = parseInt(searchParams?.limit || "5");

  return <ToDoList page={pageInt} limit={limitInt} />;
}
