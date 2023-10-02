import { useState, useEffect } from 'react'
import { type FormEvent } from '../types'

interface ValidationResult {
  msg: string
  isValid: boolean
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>
  setValidateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const useValidateForm = (formData: FormEvent[]): ValidationResult => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (validateForm) {
      formData.forEach((object, index) => {
        if (Object.values(object).includes('')) {
          setMsg(`Todos los campos son obligatorios del Evento ${index + 1} son obligatorios`)
          setIsValid(false)
          return
        }

        if (object.title.length > 18) {
          setMsg('Titulo maximo de 18 carácteres')
          setIsValid(false)
          return
        }

        if (object.offline && object.place === undefined) {
          setMsg('Introduce el lugar donde se hará el evento')
          setIsValid(false)
          return
        }

        if (object.priced && object.price === undefined) {
          setMsg('Introduce un precio de inscripción')
          setIsValid(false)
          return
        }

        if (typeof object?.price !== 'undefined' && object.price <= 0) {
          setMsg('La inscripción no puede ser 0 ni valores negativos')
          setIsValid(false)
          return
        }

        setMsg('')
        setIsValid(true)
      })
      setValidateForm(false)
    }
  }, [validateForm])

  return ({ msg, setIsValid, isValid, setValidateForm })
}

export default useValidateForm
