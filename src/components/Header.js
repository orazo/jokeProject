import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const Header = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 62,
        paddingTop: 46,
        zIndex: 100,
        backgroundColor: 'white',
      }}>
      <Text style={{alignSelf: 'center'}}>Jokes Pages</Text>
    </View>
  );
};
export default Header;
