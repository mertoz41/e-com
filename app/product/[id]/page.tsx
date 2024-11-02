import React from "react";
import type { ShopifyExtension, ShopifyProduct } from "@/src/types";
import { gql } from "@/utils/gql";
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
const getProduct = async (id: string): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query ProductsQuery {
          product(id: "gid://shopify/Product/8009116549306") {
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
export default async function ProductPage({ params }: ProductParams) {
  const { id } = await params;
  const json = await getProduct(id);
  console.log(json)
  return <div className="bg-white">singleProductpage</div>;
}
