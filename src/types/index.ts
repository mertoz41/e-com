export type ShopifyProduct = {
  id: string;
  title: string;
  featuredMedia: {
    preview: {
      image: {
        url: string;
        altText: string;
      };
    };
  };
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
    };
  };
  legacyResourceId: string;
  handle: string;
};

export type ShopifyExtension = {
  cost: {
    requestedQueryCost: number;
    actualQueryCost: number;
    throttleStatus: {
      maximumAvailable: number;
      currentlyAvailable: number;
      restoreRate: number;
    };
  };
};
