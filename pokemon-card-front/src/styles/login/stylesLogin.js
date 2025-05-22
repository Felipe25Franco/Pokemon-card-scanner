import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 810,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },

  imageBackgroundReg: {
    flex: 1,
    width: 360,
    height: 752,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    marginLeft: 25,
    top: 5,
  },

  container: {
    width: 335,
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: 'transparent',
    borderRadius: 10,
    opacity: 0.7,
    padding: 25,
  },

  overlay: {
    backgroundColor: 'rgba(211, 255, 255, 0.7)',
    padding: 10,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },

  label: {

    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  input: {
    width: 230,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  appName: {
    position: 'absolute',
    top: 130,
    left: 120,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Cor do texto
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 25,
  },

  button: {
    flex: 1, // Isso fará com que os botões ocupem o mesmo espaço horizontalmente
    height: '45%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Espaço horizontal entre os botões
  },

  buttonNex: {
    flex: 1, // Isso fará com que os botões ocupem o mesmo espaço horizontalmente
    height: '35%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Espaço horizontal entre os botões
    marginLeft: 35,
    backgroundColor: 'blue',
  },

  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: 300,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalCloseButtonText: {
    color: 'blue',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
    color: 'black',
  },
  pickerContainer: {
    width: 230,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  pickerText: {
    fontSize: 16,
    color: 'black',
  },

    calendar: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      height: 300, // Defina a altura conforme necessário
    },

});

export default styles;