import type { Pagination } from "@/trpc";
import type { FormValues } from "./form";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

export function PaginationButtons({ data }: { data: Pagination }) {
  const form = useFormContext<FormValues>();
  const currentPage = form.watch("page");

  return (
    <div className="flex gap-2 justify-center mt-6">
      <Button
        variant="link"
        onClick={() => form.setValue("page", currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => form.setValue("page", page)}
          variant={page === currentPage ? "default" : "outline"}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="link"
        onClick={() => form.setValue("page", currentPage + 1)}
        disabled={currentPage === data.totalPages}
      >
        Next
      </Button>
    </div>
  );
}
