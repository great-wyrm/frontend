import { Box, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const useMoonToast = () => {
  const chakraToast = useToast();
  
  const toast = useCallback(
    (message: string, type: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined, duration = 3000, title?: string) => {
      
      const colors = {info: 'white', warning: 'yellow', success: 'white', error: '#F56646', loading: 'white'}
      const userTitle = title ?? type;

      const userMessage =
        typeof message === 'string'
          ? message
          : userTitle === type
          ? ''
          : type;
      const id = `${userTitle}-${userMessage}-${type}`;
      if (!chakraToast.isActive(id)) {
        chakraToast({
          id: id,
          position: 'top',
          duration,
          render: () => (
            <Box 
              borderRadius='15px' 
              border='2px solid #F56646' 
              textAlign='center' 
              color={type ? colors[type] : 'white'}
              borderColor={type ? colors[type] : 'white'}
              py={3} 
              px={5} 
              bg='#353535'>
              {message}
            </Box>
          ),
        });
      }
    },
    [chakraToast]
  );

  return toast;
};

export default useMoonToast;
