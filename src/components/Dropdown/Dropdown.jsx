import { useState } from 'preact/hooks'
import { useDropdown } from '~hooks/useDropdown'
import { SECTION_OPTIONS } from '~lib/section-options'
import style from './Dropdown.module.css'

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(SECTION_OPTIONS[0])
  const {
    dropdownOpened,
    dropdownRef,
    openDropdown,
    closeDropdown,
    hideProgress,
  } = useDropdown()

  return (
    <div className={style.wrapper}>
      <button className={style.button} onClick={openDropdown}>
        {selectedOption.label}
      </button>
      {dropdownOpened && (
        <ul
          ref={dropdownRef}
          className={`${style.dropdown} ${hideProgress ? style.hide : ''}`}
          onClick={closeDropdown}
        >
          {SECTION_OPTIONS.map((option) => (
            <li
              className={`${style.option} ${
                option.label === selectedOption.label ? style.selected : ''
              }`}
              key={option.label}
              onClick={() => setSelectedOption(option)}
            >
              <img
                className={style.icon}
                src={option.src}
                alt={selectedOption.label}
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
