interface Props {
  msg: string
  isValid: boolean
}

const Alert: React.FC<Props> = ({ msg, isValid }) => {
  if (msg === '') { return }
  return (
    <div className='bg-rose-950 p-2 rounded-md mb-4'>
      <p className={`${isValid ? 'text-green-500' : 'text-rose-500'} text-sm text-center`}>{msg}</p>
    </div>
  )
}

export default Alert
