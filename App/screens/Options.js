import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
  Picker,
  Text,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'i18n-js';
import colors from '../constants/colors';
import { RowItem, RowSeparator } from '../components/RowItem';
import { ConversionContext } from '../util/ConversionContext';

const openLink = (url) =>
  Linking.openURL(url).catch(() =>
    Alert.alert('Sorry, something went wrong.', 'Please try again later.'),
  );

export default () => {
  const {
    setLang,
  } = useContext(ConversionContext);
  const [selectedValue, setSelectedValue] = useState(i18n.locale);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView>
        <RowItem
          title={i18n.t("themes")}
          onPress={() => alert('todo!')}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />

        <RowSeparator />
        <Text>lang:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            setLang(itemValue);
          }}
        >
          <Picker.Item label="he" value="he" />
          <Picker.Item label="en" value="en" />
        </Picker>

        <RowSeparator />

        <RowItem
          title="React Native Basics"
          onPress={() =>
            openLink(
              'https://learn.handlebarlabs.com/p/react-native-basics-build-a-currency-converter',
            )
          }
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />

        <RowSeparator />

        <RowItem
          title="React Native by Example"
          onPress={() => openLink('https://reactnativebyexample.com')}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
