import * as Yup from 'yup'

export const productValidation = Yup.object({
  productName: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .required('Required'),
  description: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  specialCode: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  hsnCode: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  sellingPrice: Yup.number().required('Required'),
  defaultDiscount: Yup.number('Must be a number'),
  cgst: Yup.number('Must be a number').required('required'),
  sgst: Yup.number('Must be a number').required('required'),
  igst: Yup.number('Must be a number').required('required'),
})

export const invoiceValidation = Yup.object({
  vendorName: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .required('Required'),
  outlet: Yup.string().required('Required'),
  vendorPostCode: Yup.number().required('Required'),
  clientName: Yup.string().required('Required'),
  clientEmail: Yup.string().required('Required').email('Invalid email address'),
  clientPhone: Yup.number().required('Required'),
  clientAddress: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .required('Required'),
  clientCity: Yup.string().required('Required'),
  clientPostCode: Yup.number().required('Required'),
  invoiceDate: Yup.date().min(new Date(), 'Please choose future date'),
  deliveryDate: Yup.date().min(new Date(), 'Please choose future date'),
  otherDetails: Yup.string(),
  advancePayment: Yup.number(),
  discount: Yup.number(),
  //   Yup
  //     .date()
  //     .when(
  //       'invoiceDate',
  //       (invoiceDate, schema) => {
  //         if (invoiceDate) {
  //           const dayAfter = new Date(invoiceDate.getTime() + 86400000)

  //           return schema.min(dayAfter, 'Delivery date has to be greater than invoice date')
  //         }

//         return schema
//       },
//     ),
})
