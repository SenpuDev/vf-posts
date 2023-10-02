import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  handleDownloadImage: () => void
  children: JSX.Element
}

const ModalComponent: React.FC<Props> = ({ isOpen, onOpenChange, children, handleDownloadImage }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'5xl'} scrollBehavior={'inside'} className='bg-slate-800' >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {children}
            </ModalBody>

            <div className='flex items-center justify-between px-6 py-4'>
              <p className='text-gray-100 text-sm italic'>La imagen de previsualización puede variar ligeramente con el resultado final*</p>
              <div>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='default' onPress={handleDownloadImage}>
                  Download Image
                </Button>
              </div>
            </div>

          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalComponent
