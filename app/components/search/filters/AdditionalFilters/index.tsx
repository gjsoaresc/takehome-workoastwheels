import { useFormContext } from "react-hook-form";
import { FormValues } from "../../form";
import { CheckboxFilter } from "./CheckboxFilter";
import { PassengerFilter } from "./PassangerFilter";
import { PriceFilter } from "./PriceFilter";
import { trpc } from "@/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type FilterProps = {
  form: ReturnType<typeof useFormContext<FormValues>>;
};

export function AdditionalFilters() {
  const form = useFormContext<FormValues>();
  const selectedClassifications = form.watch("classification");
  const selectedMinPassengers = form.watch("minPassengers");
  const selectedMakes = form.watch("make");

  const [vehicleOptions] = trpc.vehicles.options.useSuspenseQuery();

  const activeFiltersCount = [
    selectedClassifications?.length || 0,
    selectedMinPassengers > 1 ? 1 : 0,
    selectedMakes?.length || 0,
    form.watch("price")[0] !== 10 || form.watch("price")[1] !== 100 ? 1 : 0,
  ].reduce((acc, val) => acc + val, 0);

  const resetFilters = () => {
    form.reset();
  };

  return (
    <div className="flex flex-col md:px-4 px-0 md:py-4 py-4 gap-4">
      <div className="border-b pb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Filters{" "}
          {activeFiltersCount > 0 && <Badge>{activeFiltersCount}</Badge>}
        </h2>
        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        )}
      </div>

      <PriceFilter form={form} />
      <PassengerFilter form={form} minPassengers={selectedMinPassengers} />
      <CheckboxFilter
        form={form}
        fieldName="make"
        options={vehicleOptions.makes}
        selectedOptions={selectedMakes}
        label="Brand"
      />
      <CheckboxFilter
        form={form}
        fieldName="classification"
        options={vehicleOptions.classifications}
        selectedOptions={selectedClassifications}
        label="Type"
      />
    </div>
  );
}
