import { StyleSheet } from 'react-native';

const iconGray = '#5f5f5f';
const textGray = '#5f5f5f';

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
    color: lightGray
  },
  celebIcon: {
    color: textGray,
    paddingTop: 1,
    paddingRight: 5
  },
  date: {
    color: textGray,
    fontSize: 12,
    fontWeight: 'bold'
  }
});
