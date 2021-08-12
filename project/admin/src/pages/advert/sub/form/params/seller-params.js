import { useSelector } from "react-redux";
import { useState } from "react";

export default function SellerParams(item) {
  const sellers = useSelector((state) => state.appReducer.sellers) || [];

  const sellerOptions =
    sellers?.map((s) => ({
      label: s.fullname,
      value: s.id,
    })) || [];

  const [selectedSellers, setSelectedSellers] = useState(
    item?.seller_id
      ? [sellerOptions.find((s) => s.value === item.seller_id)]
      : []
  );

  const selectSeller = (selection) => {
    setSelectedSellers(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };

  return { sellers, sellerOptions, selectedSellers, selectSeller };
}
