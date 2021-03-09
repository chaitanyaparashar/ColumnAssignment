import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {isEmpty, filterArrayForPhone} from '../../utility/utils';

const ContactListItem = ({data, onContactSelect}) => {
  const renderRows = (phoneNumbers) => {
    if (isEmpty(phoneNumbers)) {
      return <Text style={styles.emptyDataTextStyle}>No Contact Found</Text>;
    }
    return phoneNumbers.map((phoneData, index) => {
      return (
        <TouchableOpacity
          onPress={onContactSelect.bind(null, data, phoneData)}
          key={index}
          style={styles.phoneListItem}>
          <Text>{phoneData.number}</Text>
          <Text>{phoneData.label}</Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {!isEmpty(data.thumbnailPath) ? (
            <Image
              height={25}
              width={25}
              style={styles.imageStyle}
              source={{uri: data.thumbnailPath}}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={styles.displayNumberContainerStyle}>
          <Text>{data.displayName}</Text>
        </View>
      </View>
      {renderRows(filterArrayForPhone(data.phoneNumbers))}
    </View>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  displayNumberContainerStyle: {
    paddingHorizontal: 2,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  phoneListItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  emptyDataTextStyle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
