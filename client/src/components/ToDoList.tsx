"use client";
import { Box, Tab, Tabs } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
import Pagination from "./Pagination";
import { useCompanyTodosQuery, useTodosQuery } from "@/entities/todo/queries";
import { useCategoriesQuery } from "@/entities/category/queries";
import { useCurrentUser } from "@/entities/user/queries";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type TabValue = number | "me";

interface TabPanelProps {
  children?: React.ReactNode;
  index: TabValue;
  value: TabValue;
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ToDoList({
  page,
  limit,
  categoryId,
}: {
  page: number;
  limit: number;
  categoryId?: number;
}) {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategoriesQuery();
  const { data: currentUser } = useCurrentUser();

  const router = useRouter();
  const user = currentUser?.data;

  const [value, setValue] = useState<TabValue>("me");
  const [companyId, setCompanyId] = useState<number | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: companyTodos } = useCompanyTodosQuery({
    page,
    limit,
    companyId,
  });
  console.log(companyTodos);

  const setQuery = (name: string, value?: string | number | null) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value === null || value === undefined || value === "") {
      params.delete(name);
    } else {
      params.set(name, String(value));
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleChange = (_e: React.SyntheticEvent, newValue: TabValue) => {
    setValue(newValue);

    if (newValue === "me") {
      setCompanyId(null);
      router.push(setQuery("companyId", null)); // видаляємо параметр
      return;
    }

    const nextCompanyId = Number(newValue);
    setCompanyId(nextCompanyId);
    router.push(setQuery("companyId", nextCompanyId)); // той самий pathname, інші query збережено
  };

  const {
    data: todos,
    isLoading,
    isError,
  } = useTodosQuery({
    page,
    limit,
    categoryId,
  });

  if (isLoading || categoriesLoading) return <p>Loading...</p>;
  if (isError || categoriesError) return <p>Error</p>;

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="My todos" value="me" />

        {user?.subscriptions?.map((sub: any) => (
          <Tab
            key={sub.id}
            label={sub.company?.companyName}
            value={sub.companyId}
          />
        ))}
      </Tabs>

      {/* Панель для моїх тудушок */}
      <CustomTabPanel value={value} index="me">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 4,
            marginTop: "40px",
          }}
        >
          {todos?.data?.data?.map((card: any) => (
            <ToDoItem key={card.id} card={card} categories={categories?.data} />
          ))}
          <AddTodoItem />
        </Box>
        <Pagination
          page={page}
          limit={limit}
          totalPages={todos?.data?.meta?.totalPages ?? 1}
        />
      </CustomTabPanel>
      {user?.subscriptions?.map((sub: any) => (
        <CustomTabPanel value={value} index={sub.companyId}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 4,
              marginTop: "40px",
            }}
          >
            {companyTodos?.data?.data?.map((card: any) => (
              <ToDoItem
                key={card.id}
                card={card}
                categories={categories?.data}
              />
            ))}
            <AddTodoItem />
          </Box>
          <Pagination
            page={page}
            limit={limit}
            totalPages={companyTodos?.data?.meta?.totalPages ?? 1}
          />
        </CustomTabPanel>
      ))}

      {/* Якщо пізніше захочеш показувати компанійські тудушки тут же —
          додай ще <CustomTabPanel value={value} index={sub.companyId}> з відповідним контентом */}
    </Box>
  );
}
