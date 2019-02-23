import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  listSeparator: {
    height: 0.5,
    backgroundColor: '#333' 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  celebRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  nextWrapper: {
    position: 'absolute',
    right: 0
  },
  next: {
    color: '#5f5f5f'
  },
  celebIcon: {
    color: '#5f5f5f',
    paddingTop: 1,
    paddingRight: 5
  }
});
