type CeramicsItems = {
  name: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  _id: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
};

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  image: string;
  dimensions: string;
  features: string[];
  description: string;
  quantity: number;
  discount: number;
}
