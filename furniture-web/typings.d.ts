type CeramicsItems = {
    name:string,
    price:number,
    _id:string
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    }; 
  }