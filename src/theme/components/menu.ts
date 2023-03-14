
const Menu = {
  parts: ['button', 'list', 'item'],
  baseStyle: () => {
    return {
      button: {
        color: 'green',
        _active: { textDecoration: 'none', backgroundColor: '#1A1D22' },
        _focus: { textDecoration: 'none', backgroundColor: '#1A1D22' },
        _hover: {
          textDecoration: 'none',
          backgroundColor: '#1A1D22',
          fontWeight: '700',
        },
      },
      item: {
        backgroundColor: '#1A1D22',
        px: '15px',
        fontWeight: '400',
        fontSize: 'md',
        borderRadius: '20px',
        _hover: {
          textColor: 'orange.1000',
          fontWeight: '700',
        },
        _focus: {
          textColor: 'green.100',
        },
      },
      list: {
        bg: '#1A1D22',
        borderWidth: 0,
      },
    }
  },
}

export default Menu
