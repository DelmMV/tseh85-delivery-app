import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

function ConfirmationModal({
f  isOpen, onClose, onConfirm, title, message,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent margin="1rem">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
          <Button colorScheme="blue" onClick={onConfirm}>
            Подтвердить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
