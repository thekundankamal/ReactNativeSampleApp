/* eslint-disable no-undef */
import React, {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {View, Text} from 'react-native';

export default CrayslyticsContainer = () => {
  useEffect(() => {
    crashlytics().log('CrayslyticsContainer is loading');
    crashlytics().crash();
  }, []);

  return (
    <View>
      {' '}
      <Text> Crayslytics Container </Text>
    </View>
  );
};
