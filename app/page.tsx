import Image from "next/image";
import ProductList from "./components/ProductList";

export default async function Home() {
  return (
    <div className="bg-white">
      <ProductList />
    </div>
  );
}
