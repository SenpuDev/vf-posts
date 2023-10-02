import { MONTHS } from '../consts'
import { formatDate } from '../utils'
import mk11 from './../img/characters/mk11.png'
import sf6 from './../img/characters/sf6.png'
import mk1 from './../img/characters/mk1.png'
import tkkn7 from './../img/characters/tkkn7.png'
import { type FormEvent } from '../types'

interface Props {
  calendar?: FormEvent[]
  printRef: React.RefObject<HTMLDivElement>
}

const CalendarRenderer: React.FC<Props> = ({ calendar, printRef }) => {
  if (calendar === undefined) { return }
  return (
    <>
      <div className="w-full h-full bg-[url('./img/background.png')] flex justify-center mx-auto" ref={printRef} >
        <div className='flex flex-col gap-8 p-10 my-auto flex-1'>
          {calendar.map(event => (
            <div key={event.title} className='flex'>

              {/* Date */}
              <div className='bg-white flex flex-col items-center gap-1 w-[12%] p-2'>
                <h2 className='font-antonio text-6xl text-[#0B5294]'>{formatDate(event.date, MONTHS)[0]}</h2>
                <h2 className='font-antonio text-2xl text-[#0B5294]'>{formatDate(event.date, MONTHS)[1]}</h2>
              </div>

              <div className='my-auto bg-[#0B5294] relative flex-1 z-0'>
                {/* Name & game image */}
                <div className='overflow-hidden w-full relative flex h-20 items-center justify-start'>
                  <h2 className='ml-4 font-montserrat uppercase text-4xl text-white'>
                    {event.title}
                  </h2>
                  {event.game === 'TKKN7' && (<img src={tkkn7} className='absolute top-0 right-0 w-[400px] -z-10' alt='' />)}
                  {event.game === 'MK1' && (<img src={mk1} className='absolute top-0 right-0 w-[400px] -z-10' alt='' />)}
                  {event.game === 'MK11' && (<img src={mk11} className='absolute top-0 right-0 w-[400px] -z-10' alt='' />)}
                  {event.game === 'SF6' && (<img src={sf6} className='absolute top-0 right-0 w-[400px] -z-10' alt='' />)}
                </div>

                {/* Tags */}
                <div className='flex gap-3 absolute top-[90%] h-[30%]'>
                  <div className='from-yellow-500 to-yellow-300 bg-gradient-to-r'>
                    <p className='font-montserrat py-0 px-2 font-bold uppercase text-[#0B5294]'>
                      {event.offline ? 'Presencial' : 'Online'}
                    </p>
                  </div>
                  {event.offline && (
                    <div className='from-[#ff3131] to-[#ff914d] bg-gradient-to-r mx-2'>
                      <p className='font-montserrat pb-3 px-2 font-bold text-white uppercase'>{event.place}</p>
                    </div>
                  )}
                  <div className='from-[#0097b2] to-[#7ed957] bg-gradient-to-r'>
                    <h2 className='font-montserrat pb-3 px-2 font-bold text-white uppercase'>{event.platform}</h2>
                  </div>
                </div>

              </div>

              {/* Venue price */}
              {event.priced && event.price !== null && event.price !== undefined && (
                <div className='bg-[#0B5294] w-[12%] flex flex-col items-center my-auto ml-2 gap-2 p-2'>
                  <h2 className='font-antonio text-5xl text-yellow-400'>{event.price}<span className='text-2xl'>€</span></h2>
                  <h2 className='font-antonio text-2xl text-white uppercase'>Venue</h2>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

    </>
  )
}

export default CalendarRenderer
