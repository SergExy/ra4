import { ChangeEventHandler } from "react";

interface Props {
  name?: string;
  value?: string | number | undefined;
  type?: string;
  placeholder?: string;
  className: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  readOnly: boolean;
}

const Input = ({ name, value, type = 'text', placeholder, className, onChange, readOnly }: Props) => {
  return (
    <input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      readOnly={readOnly}
    />
  )
}

export default Input