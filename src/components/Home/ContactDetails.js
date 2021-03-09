import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {isEmpty} from '../../utility/utils';

const ContactDetails = ({contactData, phoneData}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!isEmpty(contactData.thumbnailPath) ? (
          <Image
            height={50}
            width={50}
            style={styles.imageStyle}
            source={{uri: contactData.thumbnailPath}}
          />
        ) : (
          <FontAwesomeIcon name="user" size={50} color={'#aaa'} />
        )}
      </View>
      <Text style={styles.displayNameStyle}>{contactData.displayName}</Text>
      <View style={styles.phoneNumberStyle}>
        <View>
          <Text>Phone Number</Text>
          <Text>
            {phoneData && phoneData.number
              ? phoneData.number
              : 'No phone number Found'}
          </Text>
        </View>
        <View>
          <Text>Type</Text>
          <Text>
            {phoneData && phoneData.label ? phoneData.label : 'No label Found'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'center',
    width: '90%',
    marginBottom: 16,
  },
  displayNameStyle: {
    textAlign: 'center',
    marginVertical: 4,
  },
  phoneNumberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 10,
  },
});
