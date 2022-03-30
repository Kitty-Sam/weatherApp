import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { StackScreenNavigationProps } from '../../navigation/authStack/types';
import { COMMON_STACK_NAME } from '../../enum/enum';
import { CommonStackParamList } from '../../navigation/commonStack/types';
import { dayWeatherInfo } from './types';
import { styles } from './style';
import { WeatherCardDayTemplate } from '../../components/WeatherCardTemplate/WeatherCardTemplate';

export const WeatherCardScreen = (
  props: StackScreenNavigationProps<
    COMMON_STACK_NAME.WEATHER,
    CommonStackParamList
  >,
) => {
  const { route } = props;
  const { title, selectedIds } = route.params!;

  const [data, setData] = useState<dayWeatherInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (title) {
      getWeatherInfo(title);
    }
  }, [title]);

  const getWeatherInfo = async (title: string) => {
    try {
      setLoading(true);
      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${title}&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`;
      const response = await fetch(weatherURL);
      const responseForRender = await response.json();

      // filtered days, the weather during 5 days from today in 9 a.m.
      const filteredDays = responseForRender.list.filter((el: dayWeatherInfo) =>
        el.dt_txt.includes('09:00:00'),
      );

      setData((prev) => [...prev, ...filteredDays]);
      setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  };

  /*
  console.log(
    'kitti did it',
    selectedIds.map((el) => NOTIFICATIONS[selectedIds[el]['shortTitle']]),
  );
*/

  const tempMax = data.map((el) => el['main']['temp_max']);
  const tempMin = data.map((el) => el['main']['temp_min']);
  const feelsLike = data.map((el) => el['main']['feels_like']);
  const days_in_ms = data.map((el) => el['dt'] * 1000);
  const days = days_in_ms.map((el) =>
    new Date(el).toLocaleString('ru', {
      weekday: 'long',
    }),
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Hello, {title}!</Text>
          </View>
          <ScrollView
            style={styles.infoContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <WeatherCardDayTemplate
              days={days}
              feelsLike={feelsLike}
              index={0}
              tempMax={tempMax}
              tempMin={tempMin}
            />
            <WeatherCardDayTemplate
              days={days}
              feelsLike={feelsLike}
              index={1}
              tempMax={tempMax}
              tempMin={tempMin}
            />
            <WeatherCardDayTemplate
              days={days}
              feelsLike={feelsLike}
              index={2}
              tempMax={tempMax}
              tempMin={tempMin}
            />
            <WeatherCardDayTemplate
              days={days}
              feelsLike={feelsLike}
              index={3}
              tempMax={tempMax}
              tempMin={tempMin}
            />
            <WeatherCardDayTemplate
              days={days}
              feelsLike={feelsLike}
              index={4}
              tempMax={tempMax}
              tempMin={tempMin}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};
