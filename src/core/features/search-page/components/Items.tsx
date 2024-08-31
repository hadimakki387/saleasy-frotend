import { products } from "@/fake-db/products-2";
import ItemCard from "./ItemCard";
import SeTextField from "@/components/global/SeTextField";

type Props = {};

function Items({}: Props) {
  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-4">
        Sort By:{" "}
        <SeTextField
          placeholder="Price"
          className="w-40"
          select
          defaultValue={"Price"}
          size="small"
          options={[
            {
              label: "Price",
              value: "Price",
            },
          ]}
        />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {products.map((prod, index) => {
          return <ItemCard key={index} product={prod} />;
        })}
      </div>
    </div>
  );
}

export default Items;
