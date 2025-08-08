import ToDoList from "@/components/ToDoList";

type Props = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

export default async function HomePage({ searchParams }: Props) {
  const { page, limit } = await searchParams;
  const pageInt = Number(page ?? "1");
  const limitInt = Number(limit ?? "5");

  return <ToDoList page={pageInt} limit={limitInt} />;
}
