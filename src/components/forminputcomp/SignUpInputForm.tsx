import './FormInput.scss'


interface FormInputProps {
  id: string
  type: string
  label: string
  value: any
  name:string
  HandleChange: (e: any) => void
  required: boolean;
  ispassWord: boolean
}


// collect the props from the component sign in component
export const SignUpInputForm = ({ HandleChange, label, ...OtherProps}:Partial<FormInputProps>) => {
  return (
    <div className='group'>
      <input className='form-input' type={OtherProps.type} name={OtherProps.name} id={OtherProps.id} value={OtherProps.value} required={OtherProps.required}   onChange={(e) => HandleChange && HandleChange(e)} />
      {label ? (<label className={`${OtherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>): null}
    </div>
  )
}


