import React from "react";
import type { ShopifyExtension, ShopifyProduct } from "@/src/types";
import { gql } from "@/utils/gql";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Image from "next/image";

type GraphQLResponse = {
  data: {
    product: ShopifyProduct;
  };
  extensions: ShopifyExtension;
};

type ProductParams = {
  params: {
    id: string;
  };
};

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const getProduct = async (id: string): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query ProductQuery {
          product(id: "gid://shopify/Product/${id}") {
            title
            id
            featuredMedia {
              alt
              preview {
                image {
                  url
                }
              }
            }
            priceRangeV2 {
              minVariantPrice {
                amount
              }
            }
          }
        }
      `,
      variables: {
        id: `gid://shopify/Product/${id}`,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
        Failed to fetch data
        Status: ${res.status}
        Response: ${text}
      `);
  }

  return res.json();
};
const reviews = { href: "#", average: 4, totalCount: 117 };

export default async function ProductPage({ params }: ProductParams) {
  const { id } = await params;
  const json = await getProduct(id);
  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:flex">
          <div className="md:w-1/2 lg:w-1/3">
            <Image
              src={json.data.product.featuredMedia.preview.image.url}
              alt="Product Image"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>

          <div className="mt-6 md:mt-0 md:ml-8 md:w-1/2 lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900">
              {json.data.product.title}
            </h2>
            <p className="mt-2 text-gray-700">Brand Name</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              ${json.data.product.priceRangeV2.minVariantPrice.amount}
            </p>

            <div className="mt-6">
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum vestibulum.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-gray-700">Color</h3>
              <div className="mt-2 flex space-x-3">
                <button className="w-8 h-8 bg-red-600 rounded-full border border-gray-200"></button>
                <button className="w-8 h-8 bg-blue-600 rounded-full border border-gray-200"></button>
                <button className="w-8 h-8 bg-green-600 rounded-full border border-gray-200"></button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-gray-700">Size</h3>
              <select className="mt-2 w-1/3 py-2 border border-gray-300 rounded-md text-gray-700">
                <option>Select a size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>X-Large</option>
              </select>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
