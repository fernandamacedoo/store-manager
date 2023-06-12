const date = '2023-06-06T13:47:46.000Z';
const allSalesWithSaleId = [
    {
      saleId: 1,
      date,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date,
      productId: 3,
      quantity: 15,
    },
  ];

  const allSalesWithoutSaleId = [
    {
      date,
      productId: 1,
      quantity: 5,
    },
    {
      date,
      productId: 2,
      quantity: 10,
    },
    {
      date,
      productId: 3,
      quantity: 15,
    },
  ];

module.exports = { allSalesWithSaleId, allSalesWithoutSaleId };