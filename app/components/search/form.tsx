export type OrderBy = "price_asc" | "price_desc" | "name_asc" | "name_desc";

export type FormValues = {
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  price: [number, number];
  minPassengers: number;
  make: string[];
  classification: string[];
  page: number;
  orderBy?: OrderBy;
};

export const orderByOptions: { label: string; value: OrderBy }[] = [
  { label: "Price (ASC)", value: "price_asc" },
  { label: "Price (DESC)", value: "price_desc" },
  { label: "Brand (A-Z)", value: "name_asc" },
  { label: "Brand (Z-A)", value: "name_desc" },
];

export const combineDateTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(":");
  const combinedDate = new Date(date);
  combinedDate.setHours(parseInt(hours), parseInt(minutes));
  return combinedDate;
};
