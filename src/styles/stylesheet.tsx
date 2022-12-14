import {StyleSheet} from 'react-native';

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ffff',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  bloco1: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    flex: 1.5,
    //backgroundColor: 'red',
  },
  bloco2: {
    flexDirection: 'column',
    flex: 2.5,
    //backgroundColor: 'green',
  },
  bloco3: {
    flexDirection: 'column',
    flex: 1,
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    //backgroundColor: 'blue',
  },
  title: {
    color: 'black',
    fontFamily: 'Cochin-BoldItalic',
    marginTop: '20%',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderColor: '#b0e0e6',
    borderWidth: 3,
    flex: 1,
    textAlign: 'center',
    padding: '5%',
    margin: 2,
    backgroundColor: '#f5fffa',
  },
  winsquare: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderColor: '#7fff00',
    borderWidth: 3,
    flex: 1,
    textAlign: 'center',
    padding: '5%',
    margin: 2,
    backgroundColor: '#f5fffa',
  },
  status: {
    padding: '3%',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Cochin-BoldItalic',
  },
  text: {
    fontSize: 32,
    fontFamily: 'Cochin-BoldItalic',
    color: 'black',
  },
  gamestartbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 2,
    width: '60%',
    borderRadius: 2,
    padding: '2%',
    margin: '5%',
    fontFamily: 'Cochin-BoldItalic',
    fontSize: 18,
    backgroundColor: '#f5fffa',
    borderColor: '#b0e0e6',
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  actionsbutton: {
    padding: '2%',
    margin: '5%',
    width: '60%',
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
  buttontext: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Cochin-BoldItalic',
    fontSize: 18,
    color: 'black',
  },
  linha: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor:'salmon',
  },
  coluna: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'blue',
    margin: '5%',
  },
  historictext: {
    fontFamily: 'Cochin-Italic',
    fontSize: 18,
    color: 'black',
  },
  historictextbold: {
    fontSize: 18,
    fontFamily: 'Cochin-BoldItalic',
    fontWeight: 'bold',
    color: 'black',
  },

  //MODAL POPUP
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1DAFF',
    height: '30%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#9CB2D2',
    marginTop: '80%',
    marginLeft: 40,
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 0,
  },
  modaltext: {
    color: 'black',
    margin: '10%',
    fontSize: 18,
    fontFamily: 'Cochin-BoldItalic',
    fontWeight: 'bold',
  },

  modalbutton: {
    margin: 10,
    padding: 5,
    borderWidth: 3,
    borderColor: '#9CB2D2',
    width: '40%',
    backgroundColor: '#E8F1FF',
  },
});

export default stylesheet;
