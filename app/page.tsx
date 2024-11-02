import Image from "next/image";
import ProductList from "./components/ProductList";
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];
export default function Home() {
  return (
    <div className="bg-white">
      <ProductList />
    </div>
  );
}
