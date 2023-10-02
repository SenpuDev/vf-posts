import { Button, Tabs, Tab } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import CalendarEvent from './CalendarEvent'
import useValidateForm from '../hooks/useValidateForm'
import { type FormEvent } from '../types'
import Alert from './Alert'

interface Props {
  setCalendar: (formData: FormEvent[]) => void
  onOpen: () => void
}

const CalendarCreator: React.FC<Props> = ({ setCalendar, onOpen }) => {
  const initialFormEvent: FormEvent = {
    title: '',
    game: '',
    platform: '',
    date: '',
    offline: false,
    place: 'none',
    priced: false,
    price: 1
  }

  const [formData, setFormData] = useState<FormEvent[]>([initialFormEvent])
  const { msg, setIsValid, isValid, setValidateForm } = useValidateForm(formData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setValidateForm(true)
  }

  useEffect(() => {
    if (isValid) {
      setCalendar(formData)
      onOpen() // Open Modal
      setIsValid(false)
    }
  }, [isValid])

  const handleRemoveEventClick = (index: number): void => {
    if (formData.length <= 1) {
      console.log('Cant remove the only event u have!') // TODO: Show in alerts
      return
    }
    const newEvents = formData.filter((_, i) => i !== index)
    setFormData(newEvents)
  }

  const handleAddEventClick = (): void => {
    if (formData.length >= 5) {
      console.log('Max 5 events allowed') // TODO: Show in alerts
      return
    }
    setFormData(prevFormData => [...prevFormData, initialFormEvent])
  }

  // Actualizar datos del evento
  const handleEventChange = (index: number, field: string, value: string | number): void => {
    const updatedFormData = [...formData]
    updatedFormData[index] = {
      ...updatedFormData[index],
      [field]: value
    }
    setFormData(updatedFormData)
  }

  return (
    <form className='flex w-full flex-col flex-wrap md:flex-nowrap gap-4 p-4' onSubmit={handleSubmit}>
      <Tabs aria-label='Events' className='max-w-full'>
        {formData.map((formEvent, index) => (
          <Tab key={index} title={`Evento ${index + 1}`} className='py-0'>
            <Alert msg={msg} isValid={isValid} />
            <CalendarEvent
              formEvent={formEvent}
              onEventChange={(field: string, value: string) => { handleEventChange(index, field, value) }}
            ></CalendarEvent>
            <button type='button' className='text-rose-500 text-sm py-2 mt-2 ml-auto' onClick={() => { handleRemoveEventClick(index) }}>
              Eliminar evento
            </button>
          </Tab>
        ))}
      </Tabs>
      <Button color='default' className='rounded-md' onClick={handleAddEventClick}>
        Añadir otro evento
      </Button>
      <Button color='default' type='submit' className='rounded-md'>
        Generar previsualización
      </Button>
    </form >
  )
}

export default CalendarCreator
