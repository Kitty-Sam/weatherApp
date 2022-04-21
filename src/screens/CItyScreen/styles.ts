import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../theme/colors';

type CityScreenStyleType = {
  cardContainer: ViewStyle;
  imageContainer: ImageStyle;
  loader: ViewStyle;
  root: ViewStyle;
  titleText: TextStyle;
};
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create<CityScreenStyleType>({
  root: {
    backgroundColor: COLORS.BACKGROUND_COLORS.pampas,
    flex: 1,
    paddingHorizontal: 16,
  },
  titleText: {
    marginVertical: 24,
    color: COLORS.TEXT_COLORS.zuccini,
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    width: width / 2,
    height: height / 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
