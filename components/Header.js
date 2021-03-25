import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.View}>
      <Text style={styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    backgroundColor: 'rgb(24, 124, 140)',
    height: 50,
    color: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
  },
});

export default Header;
