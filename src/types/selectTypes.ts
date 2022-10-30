export type SelectOption = {
  label: string
  value: string | number
}

export interface MultipleSelectProps {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

export interface SingleSelectProps {
  multiple?: false
  value?: SelectOption
  onChange: (value?: SelectOption) => void
}