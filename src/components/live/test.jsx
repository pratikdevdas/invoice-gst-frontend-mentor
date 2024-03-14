<FieldArray name="items">
  {({ remove, push }) => (
    <div>
      <table className="w-full border-spacing-y-16">
        <thead>
          <tr className="uppercase font-semibold text-gray-700 dark:text-gray-400 text-xs">
            <th className="py-4">Item Name</th>
            <th className="py-4">Rate</th>
            <th className="py-4">Qty</th>
            <th className="py-4">Disc(̥₹)</th>
            <th className="py-4">CGST</th>
            <th className="py-4">SGST</th>
            <th className="py-4">Taxable</th>
            <th className="py-4">To Pay</th>
            <th className="py-4">del</th>
          </tr>
        </thead>
        <tbody>
          {values.items.length > 0
                          && values.items.map((item, index) => {
                            console.log(item, 'item')
                            return item.name ? (
                              <tr>ds`</tr>
                            ) : (
                              <tr className="row" key={index}>
                                <td className="col">
                                  {/* <label htmlFor={`items.${index}.name`}>Name</label> */}
                                  <Field
                                    name={`items.${index}.name`}
                                    placeholder="Jane Doe"
                                    type="text"
                                  />
                                  <ErrorMessage
                                    name={`items.${index}.name`}
                                    component="div"
                                    className="field-error"
                                  />
                                </td>
                                <td className="col">
                                  {/* <label htmlFor={`items.${index}.email`}>Email</label> */}
                                  <Field
                                    name={`items.${index}.email`}
                                    placeholder="jane@acme.com"
                                    type="email"
                                  />
                                  <ErrorMessage
                                    name={`items.${index}.name`}
                                    component="div"
                                    className="field-error"
                                  />
                                </td>
                                <td className="col">
                                  <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
          {/* {items.map((itemDetails, index) => (
                    <AddItemToLiveInvoice
                      key={index}
                      items={items}
                      setItems={setItems}
                      itemDetails={itemDetails}
                      />
                    ))} */}
        </tbody>
      </table>
      <button
        type="button"
        className=" bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6"
        onClick={() => push({ name: '', email: '' })}
      >
        + Add New Friend
      </button>
    </div>
  )}
</FieldArray>
