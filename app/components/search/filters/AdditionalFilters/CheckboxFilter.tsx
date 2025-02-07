import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { FilterProps } from ".";
import { FormValues } from "../../form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckboxFilterProps = FilterProps & {
  fieldName: keyof FormValues;
  options: string[];
  selectedOptions: string[];
  label: string;
};

export function CheckboxFilter({
  form,
  fieldName,
  options,
  selectedOptions,
  label,
}: CheckboxFilterProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">{label}</FormLabel>
          <div className="grid grid-cols-1">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${fieldName}-${option}`}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={(checked) => {
                    form.setValue("page", 1);
                    field.onChange(
                      checked
                        ? [...selectedOptions, option]
                        : selectedOptions.filter((t) => t !== option),
                    );
                  }}
                />
                <Label
                  htmlFor={`${fieldName}-${option}`}
                  className="capitalize text-lg font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}
