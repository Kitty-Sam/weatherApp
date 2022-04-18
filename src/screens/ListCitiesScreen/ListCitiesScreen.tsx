import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { SearchBar } from 'react-native-elements';
import { COMMON_STACK_NAME } from '../../enum/enum';
import { AppButton } from '../../components/AppButton/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { keyExtractor } from '../../utils/keyExtractor';
import { CityItem } from '../../components/CityItem/CityItem';
import { getSelectedCities } from '../../store/selectors/citySelector';
import { DataItemType } from './types';
import { StackScreenNavigationProps } from '../../navigation/authStack/types';
import { CommonStackParamList } from '../../navigation/commonStack/types';
import { weatherGetInfo } from '../../store/sagas/sagasActions';
import { getCurrentUser, getUsers } from '../../store/selectors/loginSelector';

export const ListCitiesScreen = (
  props: StackScreenNavigationProps<
    COMMON_STACK_NAME.TAB,
    CommonStackParamList
  >,
) => {
  const { navigation } = props;

  const [search, setSearch] = useState<string>('');

  const selectedCities = useSelector(getSelectedCities);
  const users = useSelector(getUsers);
  const current_user = useSelector(getCurrentUser);

  console.log('users from redux', users);
  console.log('current_user', current_user);

  useEffect(() => {
    const currentUser = users.find(
      (user) => user.userId === current_user.userId,
    );
    Alert.alert(`${currentUser?.userName} hello`);
  }, []);

  const dispatch = useDispatch();

  const onShowWeatherPress = () => {
    if (!search.trim()) {
      ToastAndroid.show('OOPs! Type something!', ToastAndroid.LONG);
    } else {
      dispatch(weatherGetInfo(search));
      setSearch('');
      navigation.navigate(COMMON_STACK_NAME.WEATHER, {
        title: search,
      });
    }
  };

  const onCityItemPress = (item: DataItemType) => {
    navigation.navigate(COMMON_STACK_NAME.WEATHER, {
      title: item.city,
    });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <View>
        <StatusBar hidden />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.conditionContainer}>
              <Text style={styles.conditionText}>Choose the city...</Text>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={setSearch}
                value={search}
                containerStyle={styles.searchContainer}
                style={styles.search}
                platform="android"
              />
              <View style={styles.showButtonContainer}>
                <AppButton title={'show'} onPress={onShowWeatherPress} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <Text style={[styles.conditionText, { textAlign: 'center' }]}>
          Favorite cities list
        </Text>

        <FlatList
          style={styles.listContainer}
          keyExtractor={keyExtractor}
          data={selectedCities}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cityItemContainer}
              onPress={() => onCityItemPress(item)}>
              <CityItem
                title={item.city}
                id={item.id}
                selected={item.selected}
                isDefault={item.isDefault}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
