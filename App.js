/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ListScreen from './src/screens/ListScreen';
import axios from 'axios';

const App = () => {
  const [jokes, setJokes] = useState({});
  function getOptions(limit, page) {
    return {
      method: 'get',
      url: 'https://icanhazdadjoke.com/search',
      headers: {'Content-Type': 'application/json', accept: 'application/json'},
      params: {limit: limit || 20, page: page || 1},
    };
  }
  const getData = async (limit, page) => {
    return axios(getOptions(limit, page))
      .then(response => {
        const resData = JSON.parse(JSON.stringify(response.data));
        return resData;
      })
      .catch(err => {
        console.log(err.Error);
        if (err.response.status != 200) {
          Alert.alert(`${err}`);
        }
        throw err;
      });
  };
  useEffect(() => {
    getData().then(res => {
      setJokes(res);
    });
  }, []);
  return jokes.results ? (
    <ListScreen
      jokes={jokes}
      passToNextPage={(limit, page) => getData(limit, page)}
    />
  ) : (
    <></>
  );
};

export default App;
