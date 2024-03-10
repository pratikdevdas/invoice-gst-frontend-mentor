/* eslint-disable react/jsx-props-no-spreading */
import { useField } from 'formik'

export function CustomField({ ...props }) {
  const [field, meta] = useField(props)
  const error = meta.touched && meta.error
  const { productName, label } = props
  return (
    <div className="relative">
      <label
        htmlFor={productName}
        className=" text-gray-400 font-light"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`dark:bg-[#1e2139] py-2 px-4 border-gray-300 border-[.2px] dark:border-gray-800   rounded-lg  items-center bg-[#E2DDF4] ${error ? 'outline-red-400 focus:outline-red-400' : ' focus:outline-purple-400'}  w-full outline-none focus:ring-0`}
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

export function NumberField({ ...props }) {
  const [field, meta] = useField(props)
  const { className, icon } = props
  const error = meta.touched && meta.error
  return (
    <div className={` relative flex bg[#E2DDF4] rounded-lg items-center bg-[#E2DDF4] ${className} ${error ? 'border-2 border-red-500' : ''}`}>
      <span className="text-black/50 pl-2">{icon}</span>
      <input
        {...field}
        {...props}
        className="bg-[#E2DDF4] pr-1 w-full pl-2 text-black/80 appearance-none rounded-lg border-none outline-none focus:ring-0"
        style={{
          appearance: 'textfield',
          MozAppearance: 'textfield',
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error text-sm text-red-500 mr-2">{meta.error}</div>
      ) : null}
    </div>
  )
}
