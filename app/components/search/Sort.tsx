import { useFormContext } from "react-hook-form";
import { orderByOptions, type FormValues, type OrderBy } from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Sort() {
  const form = useFormContext<FormValues>();
  const orderBy = form.watch("orderBy");

  return (
    <Select
      value={orderBy}
      defaultValue="price_asc"
      onValueChange={(val) => form.setValue("orderBy", val as OrderBy)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {orderByOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
