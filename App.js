/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
      <Text style={{fontSize: 25, marginTop: 10, alignSelf: 'center'}}>
        {' '}
        Firebase Sample
      </Text>
      <TouchableOpacity
        style={{
          height: 40,
          marginTop: 10,
          backgroundColor: '#000',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', alignSelf: 'center', fontSize: 15}}>
          Push Notification
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
