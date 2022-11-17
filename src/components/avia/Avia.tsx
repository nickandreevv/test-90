import React, { useEffect } from 'react'
import s from './avia.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type TFields = {
  departureCity: string
  arrivalCity: string
  departureDate: string
  arrivalDate: string
}

type TKeys = keyof TFields

const Avia: React.FunctionComponent = () => {
  useEffect(() => {
    localStorage.clear()
  }, [])
  const navigate = useNavigate()

  const [fields, setFields] = useState<TFields>({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    arrivalDate: '',
  })

  const handleOnClick = (): void => {
    navigate('/avia/info', { replace: true })
    let key: TKeys
    for (key in fields) {
      localStorage.setItem(key, fields[key])
    }
  }

  const onInputChange = (value: string, key: TKeys): void => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  const onDateChange = (value: string, key: TKeys): void => {
    onInputChange(value, key)
    if (key === 'departureDate') {
      const arrivalInput: HTMLInputElement | null = document.getElementById(
        'arrivalDate'
      ) as HTMLInputElement
      arrivalInput.min = value
    } else {
      const departureInput: HTMLInputElement | null = document.getElementById(
        'departureDate'
      ) as HTMLInputElement
      departureInput.max = value
    }
  }

  return (
    <div className={s.main}>
      <div className={s.firstBox}>
        <div className={s.firstBoxStyle}>
          <span className={s.textStyle}>Откуда</span>
          <input
            className={s.inputStyle}
            type="text"
            onChange={(e) => onInputChange(e.target.value, 'departureCity')}
            placeholder="Город вылета"
          ></input>
          <span className={s.textStyle}>Куда</span>
          <input
            className={s.inputStyle}
            type="text"
            onChange={(e) => onInputChange(e.target.value, 'arrivalCity')}
            placeholder="Город прилёта"
          ></input>
          <span className={s.textStyle}>Туда</span>
          <input
            className={s.dateInputStyle}
            type="date"
            id="departureDate"
            onChange={(e) => onDateChange(e.target.value, 'departureDate')}
          ></input>
          <span className={s.textStyle}>Обратно</span>
          <div className={s.line}></div>
          <input
            onChange={(e) => onDateChange(e.target.value, 'arrivalDate')}
            className={s.secondDateInputStyle}
            id="arrivalDate"
            type="date"
          ></input>
        </div>
      </div>
      <div className={s.secondBox}>
        <button
          disabled={
            !fields.arrivalCity ||
            !fields.departureCity ||
            !fields.departureDate
          }
          className={s.buttonStyle}
          onClick={handleOnClick}
        >
          Найти билеты
        </button>
      </div>
    </div>
  )
}

export default Avia
