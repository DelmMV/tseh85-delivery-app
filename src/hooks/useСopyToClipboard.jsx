import { useToast } from '@chakra-ui/react';

const useCopyToClipboard = () => {
  const toast = useToast();
  const copyText = (text) => {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-1000px';
    tempInput.style.top = '-1000px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Для мобильных устройств

    try {
      const successful = document.execCommand('copy');
      toast({
        title: successful ? `Скопировано ${text}` : 'Ошибка',
        status: successful ? 'success' : 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать текст.',
        status: err,
        duration: 1000,
        isClosable: true,
      });
    }
    console.log(tempInput.select());
    document.body.removeChild(tempInput);
  };
  return { copyText };
};

export { useCopyToClipboard };
