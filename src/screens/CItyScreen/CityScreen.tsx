import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Text, View } from 'react-native';
import { styles } from './styles';
import { FAB, Image, Overlay } from 'react-native-elements';
import { COLORS } from '../../theme/colors';
import { ImagePicker } from '../../components/ImagePicker/ImagePicker';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const img = require('../../../assets/weather.png');

export const CityScreen = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <StatusBar hidden />
      <Text style={styles.titleText}>Minsk</Text>
      <FAB
        color={COLORS.BUTTONS_COLORS.tacao}
        onPress={toggleOverlay}
        title="?"
        style={styles.fab}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}>
        <View style={styles.textOverlayContainer}>
          <Text style={styles.overlayText}>Hello!</Text>
          <Text style={styles.overlayText}>
            Just use me, if you want to know the weather
          </Text>
          <Image source={img} style={styles.imageContainer} />
        </View>
      </Overlay>
      <ImagePicker />
    </SafeAreaView>
  );
};
