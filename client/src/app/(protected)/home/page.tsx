import ToDoList from "@/components/ToDoList";

type PageProps = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

export default function HomePage({ searchParams }: PageProps) {
  const pageInt = Number(searchParams.page ?? "1");
  const limitInt = Number(searchParams.limit ?? "5");

  return <ToDoList page={pageInt} limit={limitInt} />;
}
