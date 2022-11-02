import {StyleSheet} from 'react-native';

const stylesheet_hist = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ffff',
    height: '100%',
    headerBackVisible: false,
  },
  bloco1: {
    backgroudColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  bloco2: {
    flexDirection: 'column',
    flex: 2,
    backgroudColor: 'green',
    alignItems: 'center',
    textAlign: 'center',
  },
  actionsbutton: {
    padding: '2%',
    margin: '2%',
    width: '70%',
    paddingHorizontal: '10%',
    borderWidth: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    borderColor: '#b0e0e6',
    fontFamily: 'Cochin-BoldItalic',
    fontSize: 18,
    color: 'black',
  },
  historicbutton: {
    margin: '1%',
    padding: '2%',
    width: '70%',
    marginHorizontal: '5%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    borderColor: '#b0e0e6',
  },
  historicbuttonbold: {
    margin: '1%',
    padding: '2%',
    width: '72%',
    marginHorizontal: '5%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    borderColor: '#008B8B',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default stylesheet_hist;
