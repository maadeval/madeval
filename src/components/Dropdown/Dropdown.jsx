import { useEffect, useRef, useState } from "preact/hooks";
import { SECTION_OPTIONS } from "../../lib/section-options";
import style from "./Dropdown.module.css";

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(SECTION_OPTIONS[0]);
  const {
    dropdownOpened,
    dropdownRef,
    openDropdown,
    closeDropdown,
    hideProgress,
  } = useDropdown();

  return (
    <div className={style.wrapper}>
      <button className={style.button} onClick={openDropdown}>
        {selectedOption.label}
      </button>
      {dropdownOpened && (
        <ul
          ref={dropdownRef}
          className={`${style.dropdown} ${hideProgress ? style.hide : ""}`}
          onClick={closeDropdown}
        >
          {SECTION_OPTIONS.map((option) => (
            <li
              className={`${style.option} ${
                option.label === selectedOption.label ? style.selected : ""
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
  );
};

const useDropdown = (hideTiming = 200) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);
  const dropdownRef = useRef(null);

  const openDropdown = () => setDropdownOpened(true);
  const closeDropdown = () => setHideProgress(true);

  useEffect(() => {
    if (!hideProgress) return;

    const timeoutId = setTimeout(() => {
      setDropdownOpened(false);
      setHideProgress(false);
    }, hideTiming);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hideProgress, hideTiming]);

  useEffect(() => {
    if (!dropdownOpened) return;

    const clickOutside = (evt) => {
      const clickInside = dropdownRef.current.contains(evt.target);

      if (!clickInside) closeDropdown();
    };

    document.addEventListener("click", clickOutside);

    return () => document.removeEventListener("click", clickOutside);
  }, [dropdownOpened]);

  return {
    dropdownOpened,
    dropdownRef,
    openDropdown,
    closeDropdown,
    hideProgress,
  };
};

export default Dropdown;
