import ToDoList from "@/components/ToDoList";
import DatePickerComponent from "@/components/DatePickerComponent";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; categoryId?: string }>;
}) {
  const params = await searchParams;
  const pageInt = Number(params.page ?? "1");
  const limitInt = Number(params.limit ?? "5");
  const categoryId = Number(params.categoryId ?? "0");
  return (
    <>
      <DatePickerComponent />
      <ToDoList page={pageInt} limit={limitInt} categoryId={categoryId} />
    </>
  );
}
