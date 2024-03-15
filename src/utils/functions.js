export const generateSerialNumber = (state, outlet) => {
  const filterByOutlet = state.allOrder.filter((order) => order.outlet === outlet)
  const outletCount = filterByOutlet.length + 1
  const totalCount = state.allOrder.length + 1
  return `OR-${outlet.substring(0, 4).toUpperCase()}-${outletCount}-${totalCount}`
}

export const generateLeftToPay = (items, advancePayment, discount) => items.reduce((acc, i) => acc + Number(i.total), 0)
  - advancePayment
  - discount
