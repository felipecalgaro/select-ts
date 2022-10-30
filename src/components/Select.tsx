import { useEffect, useState } from "react"
import styles from "../styles/select.module.css"

type SelectOption = {
  label: string
  value: string | number
}

interface SelectProps {
  options: SelectOption[]
  value?: SelectOption
  onChange: (value?: SelectOption) => void
}

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    onChange(undefined)
  }

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option)
  }

  function isOptionSelected(option: SelectOption) {
    return option === value
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
      <span className={styles.value}>{value?.label}</span>
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