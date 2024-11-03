import React from "react";
import type { ShopifyExtension, ShopifyProduct } from "@/src/types";
import { gql } from "@/utils/gql";
type GraphQLResponse = {
  data: {
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
    };
  };
  extensions: ShopifyExtension;
};

const getProducts = async (): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query ProductsQuery {
          products(first: 6) {
            edges {
              node {
                id
                title
                handle
                priceRangeV2 {
                  minVariantPrice {
                    amount
                  }
                }
                featuredMedia {
                  preview {
                    image {
                      url
                      altText
                    }
                  }
                }
                legacyResourceId
                vendor
              }
            }
          }
        }
      `,
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
export default async function ProductList() {
  const json = await getProducts();
  return (
    <div className="bg-white mt-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Recently added
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {json.data.products.edges.map((product) => (
            <div key={product.node.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-64">
                <img
                  alt={product.node.featuredMedia.preview.image.altText}
                  src={product.node.featuredMedia.preview.image.url}
                  className="h-full w-full object-cover object-center lg:h-48 lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/product/${product.node.legacyResourceId}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.node.title}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.node.priceRangeV2.minVariantPrice.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
