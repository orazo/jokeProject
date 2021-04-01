import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import Row from '../components/Row';
import Animated, {Extrapolate} from 'react-native-reanimated';
import Top from '../components/Top';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
const ListScreen = props => {
  console.disableYellowBox = true;
  const TOP_HEIGHT = 150;
  const {jokes, passToNextPage} = props;
  const [data, setData] = useState({
    list: jokes.results,
    page: jokes.current_page,
    nextPage: jokes.next_page,
    y: 0,
  });
  const scrollY = new Animated.Value(data.y ? data.y : 0);
  const scrollMarginY = Animated.interpolateNode(scrollY, {
    inputRange: [0, TOP_HEIGHT, Number.MAX_SAFE_INTEGER],
    outputRange: [TOP_HEIGHT, 100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  function generateRows() {
    let list = [];
    data.list.forEach(element => {
      list.push(<Row rowKey={element.id} title={element.joke} />);
    });
    return list;
  }

  function handleScrollAtEnd(y) {
    if (data.page != data.nextPage) {
      passToNextPage(20, data.nextPage).then(newData => {
        const newArray = [...data.list, ...newData.results];
        setData({
          ...data,
          list: newArray,
          y,
          page: newData.current_page,
          nextPage: newData.next_page,
        });
      });
    }
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 200;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <Top page={data.page} nextPage={data.nextPage} scrollY={scrollY} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: scrollMarginY,
        }}
        onScroll={event => {
          scrollY.setValue(event.nativeEvent.contentOffset.y);
          if (isCloseToBottom(event.nativeEvent)) {
            handleScrollAtEnd(event.nativeEvent.contentOffset.y);
          }
        }}>
        {generateRows()}
      </Animated.ScrollView>
      <Bottom page={data.page} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    height: 100,
  },
});
export default ListScreen;
