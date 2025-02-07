import { Link, useNavigate } from "react-router-dom";
import { Car, Users } from "lucide-react";
import { Button } from "../ui/button";
import { getDiffInDays } from "@/lib/times";
import { Badge } from "../ui/badge";

type VehicleItemProps = {
  vehicle: {
    id: string;
    make: string;
    model: string;
    classification: string;
    year: number;
    doors: number;
    max_passengers: number;
    hourly_rate_cents: number;
    thumbnail_url: string;
  };
  startDateTime: Date;
  endDateTime: Date;
};

export function VehicleItem({
  vehicle,
  startDateTime,
  endDateTime,
}: VehicleItemProps) {
  const navigate = useNavigate();
  const bookNowParams = new URLSearchParams({
    id: vehicle.id,
    start: startDateTime.toISOString(),
    end: endDateTime.toISOString(),
  });

  const diffInDays = getDiffInDays(startDateTime, endDateTime);
  const vehicleHoursDollar = vehicle.hourly_rate_cents / 100;
  const endPrice = diffInDays.differenceInHours * vehicleHoursDollar;

  return (
    <Link
      key={vehicle.id}
      to={{ pathname: "review", search: bookNowParams.toString() }}
      className="block"
    >
      <div className="flex flex-col md:flex-row gap-4 border rounded-2xl p-4 items-center md:items-start">
        <img
          src={vehicle.thumbnail_url}
          alt={vehicle.model}
          width={140}
          height={140}
          className="rounded-xl p-2 bg-neutral-100 hover:scale-105 transition-all ease-in md:w-40 md:h-40 w-full"
        />

        <div className="flex flex-col flex-grow text-center md:text-left">
          <h3 className="font-semibold text-xl md:text-2xl">
            {vehicle.make} {vehicle.model}
          </h3>
          <div className="flex justify-center md:justify-start gap-2 mt-2">
            <Badge>{vehicle.year}</Badge>
            <Badge>{vehicle.classification}</Badge>
          </div>
          <div className="flex justify-center md:justify-start gap-4 mt-2 text-sm md:text-base">
            <p className="flex items-center gap-1">
              <Car size={18} /> {vehicle.doors} doors
            </p>
            <p className="flex items-center gap-1">
              <Users size={18} /> {vehicle.max_passengers} passengers
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end w-full md:w-auto">
          <p className="text-sm md:text-base">
            Price for {diffInDays.differenceInDays}{" "}
            {diffInDays.differenceInDays > 1 ? "days" : "day"}:
          </p>
          <p className="font-bold text-2xl md:text-3xl">
            {endPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <Button
            className="mt-2 w-36 pointer-events-auto"
            onClick={() =>
              navigate({ pathname: "review", search: bookNowParams.toString() })
            }
          >
            Reserve now
          </Button>
          <p className="text-sm mt-2">
            Start from{" "}
            <span className="text-base font-semibold">
              {(vehicle.hourly_rate_cents / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
              <span className="text-sm">/hr</span>
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
