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
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },

  container2: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'grey',
  },
  grams: {
    fontSize: 14,
    color: 'black',
  },
});
