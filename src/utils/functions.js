export const generateSerialNumber = (state, outlet) => {
  const filterByOutlet = state.allOrder.filter((order) => order.outlet === outlet)
  const outletCount = filterByOutlet.length + 1
  const totalCount = state.allOrder.length + 1
  return `OR-${outlet.substring(0, 4).toUpperCase()}-${outletCount}-${totalCount}`
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleString('en-US', options)
}
