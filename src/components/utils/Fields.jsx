import { useField } from 'formik'

export function TextField({ ...props }) {
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
