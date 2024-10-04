import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useSubmitOrder } from '../hooks/useSubmitOrder';
import ConfirmationModal from './ConfirmationModal';

function DeliveryButton({ Status, OrderId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: submitOrder, isLoading: isSubmitting } = useSubmitOrder();
  const [currentAction, setCurrentAction] = React.useState(null);

  const handlePostOrder = () => {
    setCurrentAction('confirm');
    onOpen();
  };

  const handlePostOrderCheckout = () => {
    setCurrentAction('checkout');
    onOpen();
  };

  const handleConfirm = async () => {
    try {
      if (currentAction === 'confirm') {
        await submitOrder({
          Status: 5,
          OrderID: OrderId,
          CancelReasonID: 1,
          Comment: '',
          WishingDate: null,
        });
      } else if (currentAction === 'checkout') {
        await submitOrder({
          Status: 7,
          OrderID: OrderId,
          CancelReasonID: 1,
          Comment: '',
          WishingDate: null,
        });
      }
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating order status:', error);
    }
  };

  const renderButton = () => {
    if (Status === 5) {
      return (
        <Button
          height="35px"
          variant="outline"
          onClick={handlePostOrder}
          isLoading={isSubmitting}
          loadingText="Обработка..."
        >
          Доставить
        </Button>
      );
    }
    if (Status === 6) {
      return (
        <Button
          height="35px"
          variant="outline"
          onClick={handlePostOrderCheckout}
          isLoading={isSubmitting}
          loadingText="Обработка..."
        >
          Доставлен
        </Button>
      );
    }
    if (Status === 7) {
      return (
        <Button height="35px" variant="outline" isDisabled>
          Доставлен
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
        onClose={onClose}
        onConfirm={handleConfirm}
        title={currentAction === 'confirm' ? 'Подтвердить заказ' : 'Заказ получен'}
        message={currentAction === 'confirm' ? 'Вы уверены, что хотите подтвердить этот заказ?' : 'Вы уверены, что заказ получен?'}
      />
    </>
  );
}

export default DeliveryButton;
