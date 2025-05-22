import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
   footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000000aa',
    paddingVertical: 50,
    borderTopWidth: 1,
    borderTopColor: '#fff2',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
});
