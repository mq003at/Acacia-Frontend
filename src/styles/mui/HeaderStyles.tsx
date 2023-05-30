// Testing sx props

export const leftNavStyles = {
  logo: {
    width: 100,
    height: 40,
  },
};

export const rightNavStyles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
    flexShrink: 1
  },
  button: {
    width: 50,
    height: 50,
  },
};

export const middleNavStyles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    flexGrow: 1
  },
  categorySelect: {
    flex: 1,
    marginRight: 16,
  },
  searchInput: {
    flex: 3,
    minWidth: 0,
  },
  searchButton: {
    flex: 1,
    minWidth: 0,
    marginLeft: 16,
    bgcolor: 'primary.main',
    color: '#fff',
    borderRadius: 24,
    '&:hover': {
      bgcolor: 'primary.dark',
    },
  },
};