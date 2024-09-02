import React, {useState} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';

interface VerifyPhoneNumberModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const VerifyPhoneNumberModal: React.FC<VerifyPhoneNumberModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleSendCode = () => {
    // Logic to send the verification code to the phone number
    console.log(`Sending code to ${phoneNumber}`);
  };

  const handleVerifyCode = () => {
    // Logic to verify the entered code
    console.log(`Verifying code: ${verificationCode}`);
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Verify Phone Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button title="Send Code" onPress={handleSendCode} />

        <TextInput
          style={styles.input}
          placeholder="Enter Verification Code"
          keyboardType="number-pad"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <Button title="Verify" onPress={handleVerifyCode} />

        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default VerifyPhoneNumberModal;
