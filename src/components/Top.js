import React from 'react';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {View, Text, StyleSheet, Image} from 'react-native';

const Top = props => {
  const TOP_HEIGHT = 150;
  const HEADER_HEIGHT = 50;
  const {scrollY, page, nextPage} = props;
  const headerY = Animated.interpolateNode(scrollY, {
    inputRange: [0, TOP_HEIGHT],
    outputRange: [0, -TOP_HEIGHT + HEADER_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const marginY = Animated.interpolateNode(scrollY, {
    inputRange: [0, TOP_HEIGHT],
    outputRange: [50, 90],
    extrapolate: Extrapolate.CLAMP,
  });
  const logoOpacity = Animated.interpolateNode(scrollY, {
    inputRange: [-60, TOP_HEIGHT - 100, TOP_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 0.0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const bottomTextOpacity = Animated.interpolateNode(scrollY, {
    inputRange: [
      -60,
      TOP_HEIGHT - HEADER_HEIGHT * 2,
      TOP_HEIGHT - HEADER_HEIGHT,
    ],
    outputRange: [1, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        marginTop: marginY,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: TOP_HEIGHT,
        transform: [{translateY: headerY}],
      }}>
      <Animated.View
        style={{
          opacity: bottomTextOpacity,
          margin: 20,
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
          borderRadius: 20,
          flex: 1,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}>
        <Text>{`מספר עמודים שירדו: ${page}`}</Text>

        <View View style={styles.leftTexts}>
          <Image style={styles.img} source={require('../logo.jpg')} />
          <Text>{`עמוד הבא: ${nextPage}`}</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          alignSelf: 'center',
          opacity: logoOpacity,
          padding: 20,
          width: '100%',
          marginStart: 20,
          position: 'absolute',
          bottom: 0,
        }}>
        <Image style={styles.sticyLogo} source={require('../logo.jpg')} />
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  leftTexts: {
    justifyContent: 'space-between',
  },
  img: {
    width: 80,
    height: 40,
  },
  sticyLogo: {
    borderRadius: 20,
    borderWidth: 1,
    width: 80,
    height: 40,
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
export default Top;
