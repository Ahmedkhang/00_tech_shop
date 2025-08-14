const OrdersSchema =  {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'laptops' },
            { type: 'mobiles' },
            { type: 'smart_watches' }
          ]
        }
      ]
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: ['Pending', 'Processing', 'Completed', 'Cancelled'],
      },
      initialValue: 'Pending',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }
  ],
};
export default OrdersSchema;