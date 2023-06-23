import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import { ProductType } from "@/types/ProductType";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  return (
    <div className="text-gray-700">
      <Image
        src={image}
        alt={name}
        width={800}
        height={800}
        className="h-80 w-full rounded-lg object-cover"
      />
      <div className="py-2 font-medium">
        <h1>{name}</h1>
        <h2 className="text-sm text-teal-700">
          {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
        </h2>
      </div>
    </div>
  );
}
