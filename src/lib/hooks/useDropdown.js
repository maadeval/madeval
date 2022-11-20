import { useEffect, useRef, useState } from 'preact/hooks'

export const useDropdown = (hideTiming = 200) => {
  const [dropdownOpened, setDropdownOpened] = useState(false)
  const [hideProgress, setHideProgress] = useState(false)
  const dropdownRef = useRef(null)

  const openDropdown = () => setDropdownOpened(true)
  const closeDropdown = () => setHideProgress(true)

  useEffect(() => {
    if (!hideProgress) return

    const timeoutId = setTimeout(() => {
      setDropdownOpened(false)
      setHideProgress(false)
    }, hideTiming)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [hideProgress, hideTiming])

  useEffect(() => {
    if (!dropdownOpened) return

    const clickOutside = (evt) => {
      const clickInside = dropdownRef.current.contains(evt.target)

      if (!clickInside) closeDropdown()
    }

    document.addEventListener('click', clickOutside)

    return () => document.removeEventListener('click', clickOutside)
  }, [dropdownOpened])

  return {
    dropdownOpened,
    dropdownRef,
    openDropdown,
    closeDropdown,
    hideProgress,
  }
}
