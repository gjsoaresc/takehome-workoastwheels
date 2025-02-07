import { combineDateTime, type FormValues } from "./form";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { trpc } from "@/trpc";
import { Sort } from "./Sort";
import { PaginationButtons } from "./PaginationButtons";
import { VehicleItem } from "./VehicleItem";

export function VehicleList() {
  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const vehicleType = form.watch("classification");
  const brand = form.watch("make");
  const price = form.watch("price");
  const page = form.watch("page");
  const orderBy = form.watch("orderBy");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );

  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const [searchResponse] = trpc.vehicles.search.useSuspenseQuery(
    {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      page: Number(page),
      passengerCount: Number(minPassengers),
      classification: vehicleType,
      make: brand,
      priceMin: price[0],
      priceMax: price[1],
      orderBy: orderBy,
    },
    {
      keepPreviousData: true,
    },
  );

  if (searchResponse?.vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">
          No vehicles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="pb-4">
          <h2 className="md:text-3xl text-xl font-semibold">
            {searchResponse.pagination.totalItems}{" "}
            {searchResponse.pagination.totalItems > 1 ? "Cars" : "Car"}{" "}
            available
          </h2>
        </div>
        <Sort />
      </div>

      <ul className="space-y-4">
        {searchResponse.vehicles.map((vehicle) => (
          <VehicleItem
            key={vehicle.id}
            vehicle={vehicle}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
          />
        ))}
      </ul>

      <PaginationButtons data={searchResponse.pagination} />
    </div>
  );
}
