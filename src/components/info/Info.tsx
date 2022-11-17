import React from 'react'
import s from './info.module.css'
import { TicketInfo } from '../ticketinfo/TicketInfo'

const possibleFlights = [
  {
    departure: '09:20',
    arrival: '11:05',
  },
  {
    departure: '10:20',
    arrival: '12:05',
  },
  {
    departure: '11:20',
    arrival: '13:05',
  },
]
const Info: React.FunctionComponent = () => {
  const hasReturn: boolean = !!localStorage.getItem('arrivalDate')

  return (
    <div>
      <div className={s.card}>
        <div>
          <TicketInfo
            hasReturn={hasReturn}
            isReturnTicket={false}
            possibleFlights={possibleFlights}
          />
          {hasReturn && (
            <TicketInfo
              hasReturn={true}
              isReturnTicket={true}
              possibleFlights={possibleFlights}
            />
          )}
        </div>
        <div className={s.line}></div>
        <div className={s.price}>{hasReturn ? '8 300 ₽' : '4 150 ₽'}</div>
      </div>
    </div>
  )
}

export default Info
