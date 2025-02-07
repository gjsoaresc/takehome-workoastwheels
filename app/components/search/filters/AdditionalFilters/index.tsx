import { CheckboxFilter } from "./CheckboxFilter";
import { PassengerFilter } from "./PassangerFilter";
import { PriceFilter } from "./PriceFilter";

export function AdditionalFilters() {
  return (
    <>
      <PriceFilter />
      <PassengerFilter />
      <CheckboxFilter />
    </>
  );
}
