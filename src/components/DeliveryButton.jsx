import React, { useState, useCallback } from 'react';
import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useSubmitOrder } from '../hooks/useSubmitOrder';
import ConfirmationModal from './ConfirmationModal';

function DeliveryButton({ Status, OrderId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: submitOrder } = useSubmitOrder();
  const [currentAction, setCurrentAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const handlePostOrder = useCallback(() => {
    setCurrentAction('confirm');
    onOpen();
  }, [onOpen]);

  const handlePostOrderCheckout = useCallback(() => {
    setCurrentAction('checkout');
    onOpen();
  }, [onOpen]);

  const handleConfirm = useCallback(() => {
    setIsSubmitting(true);
    const newStatus = currentAction === 'confirm' ? 5 : 7;

    submitOrder({
      Status: newStatus,
      OrderID: OrderId,
      CancelReasonID: 1,
      Comment: '',
      WishingDate: null,
    })
      .then(() => {
        console.log('Status updated');
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  }, [currentAction, OrderId, submitOrder, onClose, toast]);

  const renderButton = () => {
    if (Status === 5) {
      return (
        <Button
          colorScheme="green"
          height="35px"
          variant="outline"
          onClick={handlePostOrder}
          isLoading={isSubmitting}
          loadingText="Обработка..."
          isDisabled={isSubmitting}
        >
          Доставить
        </Button>
      );
    }
    if (Status === 6) {
      return (
        <Button
          colorScheme="red"
          color="red"
          height="35px"
          variant="outline"
          onClick={handlePostOrderCheckout}
          isLoading={isSubmitting}
          loadingText="Обработка..."
          isDisabled={isSubmitting}
        >
          Доставлен
        </Button>
      );
    }
    if (Status === 7) {
      return (
        <Button height="35px" variant="outline" isDisabled>
          Доставил
        </Button>
      );
    }
    if (Status === 12) {
      return (
        <Button height="35px" variant="outline" isDisabled>
          Доставить
        </Button>
      );
    }
    return null;
  };

  return (
    <>
      {renderButton()}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => {
          if (!isSubmitting) {
            onClose();
          }
        }}
        onConfirm={handleConfirm}
        title={currentAction === 'confirm' ? 'Подтвердить заказ' : 'Заказ получен'}
        message={currentAction === 'confirm' ? 'Вы уверены, что хотите подтвердить этот заказ?' : 'Вы уверены, что заказ получен?'}
        isLoading={isSubmitting}
      />
    </>
  );
}

export default DeliveryButton;
