import { useFormContext } from "react-hook-form";
import { FormValues } from "../../form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FILTER_MAX_PRICE, FILTER_MIN_PRICE } from "@/utils/constants";

type FilterProps = {
  form: ReturnType<typeof useFormContext<FormValues>>;
};

export function PriceFilter({ form }: FilterProps) {
  const convertToCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">Price per hour</FormLabel>
          <div className="flex justify-between mt-2 mb-1">
            <span>${FILTER_MIN_PRICE}</span>
            <span>${FILTER_MAX_PRICE}</span>
          </div>
          <FormControl>
            <Slider
              min={FILTER_MIN_PRICE}
              max={FILTER_MAX_PRICE}
              step={1}
              defaultValue={[FILTER_MAX_PRICE]}
              onValueChange={(values) => {
                form.setValue("page", 1);
                field.onChange([FILTER_MIN_PRICE, values[0]]);
              }}
            />
          </FormControl>

          <Input readOnly value={convertToCurrency(field.value[1])} />
        </FormItem>
      )}
    />
  );
}
