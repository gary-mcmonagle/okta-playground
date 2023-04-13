import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  createConfig,
  signIn,
  signOut,
  getAccessToken,
  signInWithBrowser,
} from '@okta/okta-react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      await createConfig({
        issuer: 'https://dev-56089123.okta.com/oauth2/aus934m1fmAYT5lN95d7', // Optional
        clientId: '0oa93yqn1uqQ9aLCn5d7',
        redirectUri: 'com.okta.dev-56089123:/callback',
        endSessionRedirectUri: 'com.okta.dev-56089123:/',
        discoveryUri:
          'https://dev-56089123.okta.com/oauth2/aus934m1fmAYT5lN95d7',
        scopes: ['openid', 'profile', 'offline_access'],
        requireHardwareBackedKeyStore: true,
      });
      const signIn = await signInWithBrowser();
      console.log({signIn});
      const resp = await axios.get(
        'https://oktatestfnapp.azurewebsites.net/api/garytest',
        {
          headers: {
            Authorization: `Bearer ${signIn.access_token}`,
          },
        },
      );
      console.log({resp});
    })();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Hello Worls</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
