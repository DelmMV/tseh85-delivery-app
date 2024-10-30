import { CgComment } from 'react-icons/cg';
import { Text } from '@chakra-ui/react';

function RenderIconComments(props) {
  if (!props) {
    return null; // Если массив пуст или отсутствует, возвращаем null
  }
  return (
    <Text sx={{
      display: 'inline-flex', // Обеспечивает корректное отображение анимации
      animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite both',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
    }}
    >
      <CgComment />
    </Text>
  );
}

export { RenderIconComments };
