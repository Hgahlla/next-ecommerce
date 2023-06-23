import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import { SearchParamsTypes } from "@/types/SearchParamsType";

export default async function Product({ searchParams }: SearchParamsTypes) {
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
      />

      <div className="font-medium">
        <h1 className="py-2 text-2xl">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>

        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>

        <button className="my-12 rounded-md bg-teal-700 px-6 py-2 font-medium text-white">
          Add to cart
        </button>
      </div>
    </div>
  );
}
