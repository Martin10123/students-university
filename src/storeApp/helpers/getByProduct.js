export const getProductByAny = (products, name) => {
  if (name === "") return products;

  name = name.toLocaleLowerCase();

  return products.filter(
    (product) =>
      product.category.toLocaleLowerCase().includes(name) ||
      product.displayName.toLocaleLowerCase().includes(name) ||
      product.name.toLocaleLowerCase().includes(name) ||
      product.price.toLocaleLowerCase().includes(name) ||
      product.productDesc.toLocaleLowerCase().includes(name) ||
      product.stateProduct.toLocaleLowerCase().includes(name)
  );
};
