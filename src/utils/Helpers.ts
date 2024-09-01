import Toast from 'react-native-toast-message';

export const ToastMessage = ({message = ''}) => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};
