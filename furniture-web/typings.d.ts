type CeramicsItems = {
    name:string,
    price:number,
    quantity:number,
    _id:string
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    }; 
  }

  interface ProductDetail {
    _id: string;
    name: string;
    price: number;
    image: string;
    dimensions: string;  // Adjust the type based on actual data (string, object, etc.)
    features: string[];
    description: string;
    quantity: number;
  }
  