import { useState } from 'preact/hooks'
import style from './ToggleButtonJobDescription.module.css'

export const ToggleButtonJobDescription = ({ descriptions }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div class={style.jobDescriptionsContainer}>
      <div class={style.jobDescriptionsList}>
        {descriptions.map((description) => (
          <p class={style.jobDescription}>{description}</p>
        ))}
      </div>
      <label class={style.jobViewDetailsLabel}>
        <input
          onChange={({ target }) => setIsChecked(target.checked)}
          class={style.jobViewDetailInput}
          type="checkbox"
        />
        <span class={style.jobViewDetailButton}>
          {isChecked ? 'Ocultar texto' : 'Descubre cómo lo hice'}
        </span>
      </label>
    </div>
  )
}
