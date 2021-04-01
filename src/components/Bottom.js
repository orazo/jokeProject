import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const Bottom = props => {
  const {page} = props;
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        paddingTop: 46,
        backgroundColor: 'white',
      }}>
      <Text style={{alignSelf: 'center'}}>{`מידע עד עמוד ${page}`}</Text>
    </View>
  );
};
export default Bottom;
