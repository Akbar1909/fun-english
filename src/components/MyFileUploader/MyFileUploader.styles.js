const styles = {
  fileWidget: {
    position: 'relative',
    borderRadius: '3px',
    width: '120px',
    height: '120px',
    border: '1px solid',

    overflow: 'hidden',
    '&:hover': {
      '& .MuiBox-root': {
        background: 'white',
        opacity: 0.2,
        cursor: 'pointer'
      },
      '& .MuiStack-root': {
        display: 'flex'
      }
    },
    '& .MuiBox-root': {
      p: '8px'
    }
  },
  actionBox: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  },
  iconButton: {
    borderRadius: '50%',
    width: '30px',
    height: '30px'
  }
};

export default styles;
