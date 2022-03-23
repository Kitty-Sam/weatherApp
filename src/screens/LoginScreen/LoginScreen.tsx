import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Gap } from '../../components/Gap';
import { styles } from './styles';
import { CheckBox } from 'react-native-elements';

export const LoginScreen = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [check, setCheck] = useState(false);

  const onSendPress = () => {
    console.log('123');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <Gap scale={3} />
          <Text style={styles.titleText}>Enter in your account</Text>
          <Gap scale={3} />
          <TextInput
            placeholder="Enter your name"
            style={styles.inputText}
            onChangeText={setName}
            value={name}
          />
          <Gap scale={2} />
          <TextInput
            placeholder="Enter your password"
            style={styles.inputText}
            onChangeText={setPassword}
            value={password}
          />
          <Gap scale={2} />
          <TextInput
            placeholder="Confirm password"
            style={styles.inputText}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <Gap />
          <CheckBox
            center
            title="Remember me"
            checked={check}
            onPress={() => setCheck(!check)}
          />
          <Gap scale={2} />
          <View style={styles.buttonContainer}>
            <Button
              title="logIn"
              disabled={!name || !password || !confirmPassword}
              onPress={onSendPress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
