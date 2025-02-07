import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { FilterProps } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PassengerFilterProps = FilterProps & {
  minPassengers: number;
};

export function PassengerFilter({ form, minPassengers }: PassengerFilterProps) {
  return (
    <FormField
      control={form.control}
      name="minPassengers"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">Passengers</FormLabel>
          <Select
            value={minPassengers.toString()}
            onValueChange={(value) => {
              form.setValue("page", 1);
              field.onChange(Number(value));
            }}
          >
            <SelectTrigger id="seats">
              <SelectValue placeholder="Select passengers count" />
            </SelectTrigger>
            <SelectContent>
              {[2, 4, 5, 7, 8].map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count}
                  {count === 8 ? "+" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
