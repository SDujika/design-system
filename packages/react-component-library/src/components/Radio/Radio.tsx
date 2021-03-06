import React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface RadioProps {
  className?: string
  id?: string
  isChecked?: boolean,
  isDisabled?: boolean
  label: string
  name: string
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void
  value?: string
}

export const Radio: React.FC<RadioProps> = ({
  className = '',
  id = uuidv4(),
  isChecked,
  isDisabled = false,
  label,
  name,
  onChange,
  onBlur,
  value,
  ...rest
}) => {
  return (
    <div className={`rn-radio ${className}`} data-testid="container">
      <div className="rn-radio__outer-wrapper">
        <label className="rn-radio__label" htmlFor={id} data-testid="label">
          <input
            defaultChecked={isChecked}
            id={id}
            className="rn-radio__radio"
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={isDisabled}
            {...rest}
            data-testid="radio"
          />
          <span className="rn-radio__checkmark" />
          {label}
        </label>
      </div>
    </div>
  )
}

Radio.displayName = 'Radio'
