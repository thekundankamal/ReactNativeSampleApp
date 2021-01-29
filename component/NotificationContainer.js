/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

const NotificationContainer = () => {
  var dummnyData = [
    {title: 'This is static data notificaton will come in next row'},
  ];

  const [deviceToken, setDeviceToken] = useState('');
  const [notificatonList, setNotificationList] = useState(dummnyData);

  useEffect(() => {
    // analytics().logEvent('basket', {
    // id: 3745092,
    // item: 'mens grey t-shirt',
    // description: ['round neck', 'long sleeved'],
    // size: 'L',
    // })
    //analytics().logEvent('notification_containter',{})
    analytics().setUserId('100');
    analytics().setUserProperty('username', 'Kundan Kamal');
    // eslint-disable-next-line no-undef
    configureNotification();
    // eslint-disable-next-line no-undef
    messageListener();
    crashlytics().crash();
  }, []);

  // eslint-disable-next-line no-undef
  configureNotification = async () => {
    //It will only work with Ios device not for android
    analytics().logEvent('configure_notification', {});

    PushNotification.setApplicationIconBadgeNumber(10);
    const allowed = await requestUserPermission();
    if (!allowed) {
      return;
    }

    const token = await getFcmToken();
    if (!token) {
      return;
    }

    setDeviceToken(token);

    //When application is in background or killed and after that tapping on notificaton then we will receive callback here.
    const handleNotification = (notification) => {
      if (!notification) {
        return;
      }

      console.log('NOTIFICATION VALUE :-', notification);
    };

    messaging().onNotificationOpenedApp(handleNotification);

    messaging().getInitialNotification().then(handleNotification);

    // crashlytics().log("Notification configured")
  };

  //For local notification we can use
  // eslint-disable-next-line no-undef
  initlocalNotification = (title, message) => {
    PushNotification.localNotification({
      title: title, // (optional)
      message: message, // (required)
    });
  };

  //calling method to do request permission
  async function requestUserPermission() {
    analytics().logEvent('notification_permission', {});
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
      authStatus === messaging.AuthorizationStatus.AUTHORIZED;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    crashlytics().log('Notification permission ' + enabled);

    return enabled;
  }

  //Reciving notification in foreground....
  // eslint-disable-next-line no-undef
  messageListener = async () => {
    messaging().onMessage(async (remoteMessage) => {
      const {title} = remoteMessage.notification;
      var notificationlistData = notificatonList;
      notificationlistData.push({title: title});
      setNotificationList(notificationlistData);
    });
  };

  async function getFcmToken() {
    const fcmToken = await messaging().getToken();
    crashlytics().log('Notofication token ' + fcmToken);

    analytics().logEvent('notification_token', {item: 'kkkkkklkl'});

    return fcmToken;
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          marginTop: 10,
          marginRight: 10,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        Your Device Token
      </Text>
      <Text style={{fontSize: 15, alignSelf: 'center'}}>{deviceToken}</Text>
      <Text style={{fontSize: 25, alignSelf: 'center', fontWeight: 'bold'}}>
        Received Notification
      </Text>

      <FlatList
        data={notificatonList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={{fontSize: 17, color: '#000'}}>{item.title}</Text>
        )}
      />
    </View>
  );
};

export default NotificationContainer;
