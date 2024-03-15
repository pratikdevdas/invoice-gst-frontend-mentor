/* eslint-disable react/jsx-props-no-spreading */
import { useField } from 'formik'

export function CustomField({ ...props }) {
  const [field, meta] = useField(props)
  const error = meta.touched && meta.error
  const { productName, label } = props
  return (
    <div className="relative">
      <label htmlFor={productName} className=" text-gray-400 font-light">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`dark:bg-[#1e2139] py-2 px-4 border-gray-300 border-[.2px] dark:border-gray-800   rounded-lg  items-center bg-[#E2DDF4] ${
          error
            ? 'outline-red-400 focus:outline-red-400'
            : ' focus:outline-purple-400'
        }  w-full outline-none focus:ring-0`}
        style={{
          appearance: 'textfield',
          MozAppearance: 'textfield',
        }}
      />
      {error ? (
        <div className="error text-sm shrink-0 absolute right-10 top-9 text-red-500">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export function OutletDropDown({ ...props }) {
  const [field, meta] = useField(props)
  const error = meta.touched && meta.error
  const { label, options } = props
  return (
    <div className="relative">
      <label htmlFor={field.name} className=" text-gray-400 font-light">
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={`dark:bg-[#1e2139] py-3 px-4 border-gray-300 border-[.2px] dark:border-gray-800   rounded-lg  items-center bg-[#E2DDF4] ${
          error
            ? 'outline-red-400 focus:outline-red-400'
            : ' focus:outline-purple-400'
        }  w-full outline-none focus:ring-0`}
        style={{
          appearance: 'textfield',
          MozAppearance: 'textfield',
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error ? (
        <div className="error text-sm shrink-0 absolute right-10 top-9 text-red-500">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}
export function LiveField({ ...props }) {
  const [field, meta] = useField(props)
  const error = meta.touched && meta.error
  const { placeholder } = props
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={`dark:bg-[#1e2139] text-right outline-offset-0 mt-[1px] placeholder-slate-600 outline-[0.5px]  items-center bg-[#E2DDF4] ${
          error
            ? 'outline-red-400 focus:outline-red-400'
            : ' focus:outline-purple-400'
        }  w-full outline-none focus:ring-0`}
        style={{
          appearance: 'textfield',
          MozAppearance: 'textfield',
        }}
      />
      {error ? (
        <div className="error text-sm shrink-0 absolute bottom-1 -left-16 text-red-500">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export function LiveNumber({ ...props }) {
  const [field, meta] = useField(props)
  const error = meta.touched && meta.error
  const { placeholder, width } = props
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={`dark:bg-[#141625] py-2 px-4 border-gray-300 border-[.2px] dark:border-gray-800   rounded-lg  items-center bg-[#E2DDF4] ${
          error
            ? 'outline-red-400 focus:outline-red-400'
            : ' focus:outline-purple-400'
        } outline-none focus:ring-0 w-${width || 'full'}`}
        style={{
          appearance: 'textfield',
          MozAppearance: 'textfield',
        }}
      />
      {/* {error ? (
        <div className="error text-sm shrink-0 absolute bottom-1 -left-16 text-red-500">
          {meta.error}
        </div>
      ) : null} */}
    </div>
  )
}
