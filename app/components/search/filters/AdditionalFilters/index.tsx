import { useFormContext } from "react-hook-form";
import { FormValues } from "../../form";
import { CheckboxFilter } from "./CheckboxFilter";
import { PassengerFilter } from "./PassangerFilter";
import { PriceFilter } from "./PriceFilter";
import { trpc } from "@/trpc";

export type FilterProps = {
  form: ReturnType<typeof useFormContext<FormValues>>;
};

export function AdditionalFilters() {
  const form = useFormContext<FormValues>();
  const selectedClassifications = form.watch("classification");
  const selectedMinPassengers = form.watch("minPassengers");
  const selectedMakes = form.watch("make");

  const [vehicleOptions] = trpc.vehicles.options.useSuspenseQuery();

  return (
    <div className="flex flex-col md:px-4 px-0 md:py-4 py-4 gap-4">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
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
