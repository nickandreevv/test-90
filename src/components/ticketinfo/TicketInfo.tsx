import React, { useState } from 'react'
import s from './ticketInfo.module.css'

type TFlight = {
  departure: string
  arrival: string
}

type Props = {
  hasReturn: boolean
  isReturnTicket: boolean
  possibleFlights: TFlight[]
}

export const TicketInfo: React.FunctionComponent<Props> = ({
  hasReturn,
  isReturnTicket,
  possibleFlights,
}) => {
  const departureCity: string | null = localStorage.getItem('departureCity')
  const departureDate: string | null = localStorage.getItem('departureDate')
  const arrivalCity: string | null = localStorage.getItem('arrivalCity')
  const arrivalDate: string | null = localStorage.getItem('arrivalDate')
  const [currentTime, setCurrentTime] = useState<number>(0)

  const renderTime = (direction: 'departure' | 'arrival') => {
    const isDeparture: boolean = direction === 'departure'
    const departureTime: string = hasReturn
      ? '22:57'
      : possibleFlights[currentTime].departure
    const arrivalTime: string = hasReturn
      ? '11:20'
      : possibleFlights[currentTime].arrival
    let time: string
    if (isReturnTicket) {
      time = isDeparture ? arrivalTime : departureTime
    } else {
      time = isDeparture ? departureTime : arrivalTime
    }

    const city: string | null = isDeparture ? departureCity : arrivalCity
    const date: string | null = isReturnTicket ? arrivalDate : departureDate
    return (
      <div className={s.timeWrapper}>
        <div className={s.time}>{time}</div>
        <div className={s.city}>{city}</div>
        <div className={s.date}>{date}</div>
      </div>
    )
  }
  return (
    <div className={s.infoWrapper}>
      <div className={s.info}>
        <div className={s.stickerOne}>Невозвратный</div>
        <div className={s.logo}>
          <img src="/icons/logo.svg" alt="logo" />
          <h5 className={s.logoTextStyle}>S7 Airlines</h5>
        </div>
      </div>
      <div className={s.timeWrapper}>
        <div className={s.secondTimeWrapper}>
          {renderTime(!isReturnTicket ? 'departure' : 'arrival')}

          <div className={s.way}>
            <div className={s.airports}>
              <span>SVO</span>
              <span>ROV</span>
            </div>
            <div className={s.line} />
            <div className={s.wayTime}>В пути 1 ч 55 мин</div>
          </div>

          {renderTime(!isReturnTicket ? 'arrival' : 'departure')}

          <div className={s.icons}>
            <img className={s.firstIcon} src="/icons/bag.svg" alt="bag" />
            <img src="/icons/bag2.svg" alt="bag2" />
          </div>
        </div>

        {!hasReturn && (
          <div className={s.buttons}>
            {possibleFlights.map((item, index) => (
              <button
                className={index === currentTime ? s.active : s.defaultButton}
                onClick={() => setCurrentTime(index)}
                key={index}
              >
                <span>{item.departure}</span> - {item.arrival}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
