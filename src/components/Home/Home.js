import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform, FlatList, BackHandler} from 'react-native';
import Contacts from 'react-native-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';
import Button from '../common /Button';
import {isEmpty} from '../../utility/utils';
import SearchBar from '../common /SearchBar';
import ContactListItem from './ContactListItem';
import ContactDetails from './ContactDetails';
import Header from '../common /Header';

let phoneData;
let searchText = '';
let selectedContact;
let forceRefresh = false;
// used global variables instead of useState to avoid re rendering
const Home = () => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  // back button press handling
  function handleBackButtonClick() {
    if (forceRefresh) {
      goToHomeScreen();
      return true;
    } else {
      return false;
    }
  }


  // search contacts
  const search = (text) => {
    text = text.trim();
    searchText = text;
    if (text === '' || text === null) {
      loadContacts();
    } else {
      Contacts.getContactsMatchingString(text).then((contacts) => {
        setContactList(contacts);
      });
    }
  };

    // load contacts
  const loadContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContactList(contacts);
      })
      .catch((e) => {});
  };

  const onSubmit = () => {
    // contact permission handling
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.READ_CONTACTS).then((result) => {
        if (result === 'denied') {
          Toast.show(
            'Please grant permission for accessing contacts.',
            Toast.SHORT,
          );
        } else if (result === 'unavailable') {
          Toast.show('Contacts are not available.', Toast.SHORT);
        } else if (result === 'blocked') {
          Toast.show(
            'Permission blocked by user, Please enable contact permission from settings -> all apps -> ColumnAssignment -> permissions',
            Toast.SHORT,
          );
        } else if (result === 'granted') {
          forceRefresh = true;
          loadContacts();
        } else if (result === 'limited') {
          Toast.show('permission limited by user.', Toast.SHORT);
        }
      });
    } else {
      request(PERMISSIONS.IOS.CONTACTS).then((result) => {
        if (result === 'denied') {
          Toast.show(
            'Please grant permission for accessing contacts.',
            Toast.SHORT,
          );
        } else if (result === 'unavailable') {
          Toast.show('Contacts are not available.', Toast.SHORT);
        } else if (result === 'blocked') {
          Toast.show(
            'Permission blocked by user, Please enable contact permission from settings -> all apps -> ColumnAssignment -> permissions',
            Toast.SHORT,
          );
        } else if (result === 'granted') {
          forceRefresh = true;
          loadContacts();
        } else if (result === 'limited') {
          Toast.show('permission limited by user.', Toast.SHORT);
        }
      });
    }
  };

  const onContactSelect = (data, mobileData) => {
    phoneData = mobileData;
    selectedContact = data;
    searchText = '';
    forceRefresh = false;
    setContactList([]);
  };

  const goToHomeScreen = () => {
    searchText = '';
    selectedContact = '';
    forceRefresh = false;
    setContactList([]);
  };

  console.log('Re Rendering is dangerous');
  // if select Contact button is pressed then list will be shown.
  return (
    <View style={styles.fullFlexStyle}>
      {forceRefresh ? (
        <View style={styles.fullFlexStyle}>
          <Header title="ColumnAssignment" goBack={goToHomeScreen} />
          <SearchBar onChangeText={search} text={searchText} />
          <FlatList
            data={contactList}
            renderItem={({item}) => (
              <ContactListItem data={item} onContactSelect={onContactSelect} />
            )}
            numColumns={1}
            ItemSeparatorComponent={(props) => {
              return <View style={styles.separatorStyle} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          {!isEmpty(selectedContact) ? (
            <ContactDetails
              contactData={selectedContact}
              phoneData={phoneData}
            />
          ) : (
            <View />
          )}
          <Button title="Select Contact" onSubmit={onSubmit} />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  fullFlexStyle: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: 'gray',
  },
});
