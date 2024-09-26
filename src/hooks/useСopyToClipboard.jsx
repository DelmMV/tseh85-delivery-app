import { useToast } from '@chakra-ui/react';

const useCopyToClipboard = () => {
  const toast = useToast();

  const copyText = async (text) => {
    if (!navigator.clipboard) {
      toast({
        title: 'Ошибка',
        description: 'Копирование в буфер обмена не поддерживается вашим браузером.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Успешно скопировано',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (err) {
      console.error('Ошибка при копировании текста:', err);
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать текст в буфер обмена.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return { copyText };
};

export { useCopyToClipboard };
