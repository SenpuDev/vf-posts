import { Checkbox, Select, SelectItem, Input } from '@nextui-org/react'
import { GAME_TITLES, GAME_PLATFORMS } from './../consts'
import { type FormEvent } from '../types'

interface Props {
  formEvent: FormEvent
  onEventChange: any
}

const CalendarEvent: React.FC<Props> = ({ formEvent, onEventChange }) => {
  return (
    <div className='flex flex-col gap-4'>

      <Input
        type='text'
        variant='bordered'
        label='Nombre de evento/torneo'
        placeholder='Ej: Torneo Mortal Combat 11'
        className='dark:text-white dark:bg-transparent'
        value={formEvent.title}
        name='title'
        onChange={(e) => onEventChange('title', e.target.value)}
      />
      <div className='gap-2 sm:flex'>

        <Select
          label='Game Banner'
          placeholder='Juego'
          variant='bordered'
          className='dark:text-white mb-4 sm:mb-0'
          name='game'
          defaultSelectedKeys={formEvent.game === '' ? '' : [formEvent.game]}
          onChange={(e) => onEventChange('game', e.target.value)}
        >
          {Object.keys(GAME_TITLES).map((key) => (
            <SelectItem key={key} value={key}>
              {GAME_TITLES[key as keyof typeof GAME_TITLES]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label='Plataforma'
          placeholder='Plataforma'
          variant='bordered'
          className='dark:text-white'
          name='platform'
          defaultSelectedKeys={formEvent.platform === '' ? '' : [formEvent.platform]}
          onChange={(e) => onEventChange('platform', e.target.value)}
        >
          {Object.keys(GAME_PLATFORMS).map((key) => (
            <SelectItem key={key} value={key}>
              {GAME_PLATFORMS[key as keyof typeof GAME_PLATFORMS]}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Input
        type='date'
        variant='bordered'
        label='Fecha'
        placeholder='Ej: 20/01/2024'
        className='dark:text-white'
        name='date'
        value={formEvent.date}
        onChange={(e) => onEventChange('date', e.target.value)}
      />

      <div className='sm:flex sm:justify-between'>
        <Checkbox
          defaultSelected={formEvent.offline}
          className='py-6'
          onChange={(e) => onEventChange('offline', e.target.checked)}
          name='offline'
        >Presencial</Checkbox>

        {formEvent.offline && (
          <Input
            type='text'
            variant='bordered'
            label='Lugar'
            placeholder='Ej: Centro comercial JS'
            className='dark:text-white sm:w-1/2'
            name='place'
            value={formEvent.place}
            onChange={(e) => onEventChange('place', e.target.value)}
          />
        )}
      </div>
      <div className='sm:flex sm:justify-between'>
        <Checkbox
          defaultSelected={formEvent.priced}
          onChange={(e) => onEventChange('priced', e.target.checked)}
          className='py-6'
          name='priced'
        >Con precio de inscripción</Checkbox>
        {formEvent.priced && (
          <Input
            type='number'
            variant='bordered'
            label='Precio de inscripción'
            placeholder='Ej: 3€'
            className='dark:text-white sm:w-1/2'
            name='price'
            value={formEvent.price?.toString()}
            onChange={(e) => onEventChange('price', e.target.value)}
          />
        )}
      </div>

    </div>

  )
}

export default CalendarEvent
