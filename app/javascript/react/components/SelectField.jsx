import React from 'react'

// The line, direction, origin and destination pickers were four near-identical
// components; they are all this one controlled select.
const SelectField = ({ label, name, value, onChange, disabled = false, children }) => (
  <label className="block">
    <span className="mb-1 block font-display text-sm">{label}</span>
    <select
      className="field-input disabled:opacity-50"
      name={name}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    >
      {children}
    </select>
  </label>
)

export default SelectField
