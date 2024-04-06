import React from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";
import { formatPrice } from "@/utils/helper";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (name: string, value: Range) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabledDates: Date[];
}

const Calendar = dynamic(() => import("@/components/Calender"), {
  ssr: false
})

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-lg font-semibold">KES {formatPrice(price)}</span>
        <span className="font-light text-neutral-600">/month</span>
      </div>
      <hr />

   <div>
<p className="p-4">
  Contact:254 7...
</p>

   </div>

      <hr />
      <div className="p-4">
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          className="flex flex-row items-center justify-center h-[42px]  rounded-xl"
          size="large"
        >
          {isLoading ? <SpinnerMini /> : <span>Book a Tour</span>}
        </Button>
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <span>Total</span>
        <span>KES {formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
