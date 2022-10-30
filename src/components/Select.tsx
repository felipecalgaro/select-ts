import { useEffect, useState } from "react"
import styles from "../styles/select.module.css"

export type SelectOption = {
  label: string
  value: string | number
}

interface MultipleSelectProps {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

interface SingleSelectProps {
  multiple?: false
  value?: SelectOption
  onChange: (value?: SelectOption) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  return (
    <div
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className={styles.container}
      onBlur={() => setIsOpen(false)}
    >
      <span
        className={styles.value}
      >
        {multiple ? value.map(v => (
          <button
            key={v.value}
            onClick={e => {
              e.stopPropagation()
              selectOption(v)
            }}
            className={styles['option-badge']}
          >
            {v.label}
            <span className={styles['remove-btn']}>&times;</span>
          </button>
        )) : value?.label}
      </span>
      <button
        className={styles['clear-btn']}
        onClick={e => {
          e.stopPropagation()
          clearOptions()
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ''} ${index === highlightedIndex ? styles.highlighted : ''}`}
            key={option.value}
            onClick={e => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}