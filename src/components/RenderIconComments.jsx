import { CgComment } from 'react-icons/cg';

function RenderIconComments(comments) {
  if (!comments || comments.length === 0) {
    return null; // Если массив пуст или отсутствует, возвращаем null
  }
  return <CgComment />;
}

export { RenderIconComments };
