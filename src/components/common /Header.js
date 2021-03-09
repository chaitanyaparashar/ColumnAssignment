import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        ...props.style,
      }}>
      <MaterialIcons
        name="arrow-back"
        size={28}
        color={'#fff'}
        onPress={props.goBack.bind()}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#0071BC',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    elevation: 50,
    zIndex: 4,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    color: '#fff',
    paddingHorizontal: 8,
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    paddingBottom: 2,
  },
});

export default Header;
