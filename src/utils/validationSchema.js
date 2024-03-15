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
  clientName: Yup.string().required('Required'),
  clientEmail: Yup.string().required('Required').email('Invalid email address'),
  clientPhone: Yup.number().required('Required'),
  clientAddress: Yup.string(),
  clientCity: Yup.string(),
  clientGST: Yup.string(),
  clientPostCode: Yup.number(),
  clientBirthDate: Yup.date(),
  deliveryDate: Yup.date().min(new Date(), 'Please choose future date').required('Required'),
  advancePayment: Yup.number(),
  discount: Yup.number(),
})
