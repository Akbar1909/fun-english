const globalStyles = {
  pointer: {
    cursor: 'pointer',
  },
  dangerouslyHtml: {
    '& img': {
      maxWidth: '100%',
      aspectRatio: 1,
    },
    '& *': {
      lineHeight: 'inherit',
    },
  },
  ellipsis: (lineClamp) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: `${lineClamp}`, // number to string conversion
    WebkitBoxOrient: 'vertical',
  }),
  uppercase: {
    textTransform: 'uppercase',
  },
};

export default globalStyles;
