const variantOrangeGradient = () => {
  return {
    border: 'none',
    borderRadius: '30px',
    fontSize: ['md', 'md', 'lg', 'lg', 'xl', 'xl'],
    textColor: 'white',
    bg: 'linear-gradient(92.26deg, #F56646 8.41%, #FFFFFF 255.37%)',
    fontWeight: '700',
    padding: '5px 30px',
    maxHeight: '36px',
    _hover: {
      bg: 'linear-gradient(264.06deg, #F56646 -6.89%, #FFFFFF 335.28%)',
    },
  }
}

const variantWyrmButton = () => {
  return {
    minW: ['100%', '100%', '0'],
    px: ['0', '0', '80px'],
    fontSize: ['16px', '20px', '20px'],
    fontWeight: '900',
    h: ['40px', '46px', '46px'],
    borderRadius: '30px',
    textTransform: 'uppercase',
  }
}

const variantPlainOrange = () => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid transparent',
    borderRadius: '30px',
    fontSize: ['md', 'md', 'lg', 'lg', 'xl', 'xl'],
    textColor: 'white',
    bg: '#F56646',
    fontWeight: '700',
    padding: '10px 30px',
    _hover: {
      backgroundColor: '#F4532F',
      textDecoration: 'none',
    },
    _focus: {
      backgroundColor: '#F4532F',
    },
    _active: {
      backgroundColor: '#F4532F',
    },
  }
}

const Button = {
  // 1. We can update the base styles
  baseStyle: () => ({
    px: '1rem',
    py: '1rem',
    transition: '0.1s',
    width: 'fit-content',
    borderRadius: 'md',
    borderStyle: 'solid',
    fontWeight: '600',
    m: 0,
  }),
  sizes: {
    xl: {
      h: 16,
      minW: 16,
      fontSize: '4xl',
      px: 8,
    },
  },
  // 3. We can add a new visual variant
  variants: {
    plainOrange: variantPlainOrange,
    orangeGradient: variantOrangeGradient,
    wyrmButton: variantWyrmButton,
  },
}
export default Button
