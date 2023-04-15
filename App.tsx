import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

const App = () => {
  const checkPreviousSession = async () => {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      const report = await Crashes.lastSessionCrashReport();
      Alert.alert('Sorry about that crash');
      console.log('report', report);
    }
  };

  useEffect(() => {
    checkPreviousSession().then();
  }, []);
  const sentAnalytics = async () => {
    await Analytics.trackEvent('Calculate', {
      Internet: 'WiFi',
      Gps: 'Off',
    });
  };

  const generateCrash = async () => {
    await Crashes.generateTestCrash();
  };

  return (
    <View style={SS.container}>
      <TouchableOpacity onPress={sentAnalytics} style={SS.touchable}>
        <Text>{'Sent analytics event'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={generateCrash} style={SS.touchable}>
        <Text>{'Generate crash'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'aqua',
  },
});

export default App;
