import { useState, useRef } from 'react'
import CalendarCreator from './components/CalendarCreator'
import CalendarRenderer from './components/CalendarRenderer'
import './index.css'
import { type FormEvent } from './types'
import { useDisclosure } from '@nextui-org/react'
import ModalComponent from './components/ModalComponent'
import html2canvas from 'html2canvas'

const App = (): JSX.Element => {
  const [calendar, setCalendar] = useState<FormEvent[]>([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const printRef = useRef<HTMLDivElement>(null)

  const handleDownloadImage = (): void => {
    const element = printRef.current
    if (element !== null) {
      // Fixed text displace bug
      const style = document.createElement('style')
      document.head.appendChild(style)
      style.sheet?.insertRule('body > div:last-child img { display: inline-block; }')

      html2canvas(element, {
        scale: 2
      }).then(canvas => {
        style.remove() // Fixed text displace bug
        const data = canvas.toDataURL('image/png')
        const link = document.createElement('a')

        if (typeof link.download === 'string') {
          link.href = data
          link.download = 'image.jpg'

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          window.open(data)
        }
      }).catch(error => {
        console.error('Error generating the canvas with the screenshot!', error)
      })
    }
  }

  return (
    <div className='bg-default-50 h-screen dark pt-10'>
      <div className='w-[90%] md:w-1/2 mx-auto border-2 border-default-200 rounded-md'>
        <CalendarCreator setCalendar={setCalendar} onOpen={onOpen} />
        <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} handleDownloadImage={handleDownloadImage}>
          <CalendarRenderer calendar={calendar} printRef={printRef} />
        </ModalComponent>
      </div>
    </div>
  )
}

export default App
