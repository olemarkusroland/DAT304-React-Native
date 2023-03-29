import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#516fde',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    paddingLeft: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  searchbar: {
    borderRadius: 25,
    borderWidth: 0,
    backgroundColor: '#f2f2f2',
    height: 50,
  },
  badges: {
    fontSize: 13,
    position: 'relative',
    top: -5,
    left: 5,
  },
});
