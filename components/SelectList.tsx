import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Keyboard,
  FlatList
} from 'react-native';

import { SelectListProps } from '..';

type L1Keys = { key?: any; value?: any; disabled?: boolean };

const SelectList: React.FC<SelectListProps> = ({
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  defaultOption,
  searchicon = false,
  arrowicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = "search",
  notFoundText = "No data found",
  disabledItemStyles,
  disabledTextStyles,
  onSelect = () => {},
  save = 'key',
  dropdownShown = false,
  fontFamily,
  flatListProps = {} 

}) => {
  const oldOption = useRef(null);
  const [_firstRender, _setFirstRender] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(dropdownShown);
  const [selectedVal, setSelectedVal] = useState<any>("");
  const [height, setHeight] = useState<number>(200);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  const slidedown = useCallback(() => {
    setDropdown(true);
    Animated.timing(animatedValue, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, height]);

  const slideup = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  }, [animatedValue]);

  useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Filter data based on the search query.
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const result = data.filter((item: L1Keys) => {
        const row = item.value.toLowerCase();
        return row.indexOf(searchQuery.toLowerCase()) > -1;
      });
      setFilteredData(result);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect();
  }, [selectedVal]);

  useEffect(() => {
    if (!_firstRender && defaultOption && oldOption.current !== defaultOption.key) {
      oldOption.current = defaultOption.key;
      setSelected(defaultOption.key);
      setSelectedVal(defaultOption.value);
    }
    if (defaultOption && _firstRender && defaultOption.key !== undefined) {
      oldOption.current = defaultOption.key;
      setSelected(defaultOption.key);
      setSelectedVal(defaultOption.value);
    }
  }, [defaultOption]);

  useEffect(() => {
    if (!_firstRender) {
      if (dropdownShown) slidedown();
      else slideup();
    }
  }, [dropdownShown, _firstRender, slidedown, slideup]);

  const handleSelectItem = useCallback((item: L1Keys) => {
    const key = item.key ?? item.value ?? item;
    const value = item.value ?? item;
    if (save === 'value') {
      setSelected(value);
    } else {
      setSelected(key);
    }
    setSelectedVal(value);
    slideup();
    setTimeout(() => {
      setFilteredData(data);
      setSearchQuery("");
    }, 800);
  }, [data, save, slideup, setSelected]);

  const renderItem = useCallback(({ item }: { item: L1Keys; index: number }) => {
    const key = item.key ?? item.value ?? item;
    const value = item.value ?? item;
    const disabled = item.disabled ?? false;
    if (disabled) {
      return (
        <TouchableOpacity
          style={[styles.disabledoption, disabledItemStyles]}
          onPress={() => {}}
        >
          <Text style={[{ color: '#c4c5c6', fontFamily }, disabledTextStyles]}>
            {value}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.option, dropdownItemStyles]}
        onPress={() => handleSelectItem(item)}
      >
        <Text style={[{ fontFamily }, dropdownTextStyles]}>{value}</Text>
      </TouchableOpacity>
    );
  }, [disabledItemStyles, disabledTextStyles, dropdownItemStyles, dropdownTextStyles, fontFamily, handleSelectItem]);

  const keyExtractor = useCallback((item: L1Keys, index: number) => {
    return item.key ? String(item.key) : String(index);
  }, []);

  return (
    <View>
      {dropdown && search ? (
        <View style={[styles.wrapper, boxStyles]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            { !searchicon ? (
              <Image
                source={require('../assets/images/search.png')}
                resizeMode='contain'
                style={{ width: 20, height: 20, marginRight: 7 }}
              />
            ) : searchicon }
            <TextInput
              placeholder={searchPlaceholder}
              onChangeText={(val) => setSearchQuery(val)}
              value={searchQuery}
              style={[{ padding: 0, height: 20, flex: 1, fontFamily }, inputStyles]}
            />
            <TouchableOpacity onPress={slideup}>
              { !closeicon ? (
                <Image
                  source={require('../assets/images/close.png')}
                  resizeMode='contain'
                  style={{ width: 17, height: 17 }}
                />
              ) : closeicon }
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.wrapper, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              Keyboard.dismiss();
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <Text style={[{ fontFamily }, inputStyles]}>
            {selectedVal === "" ? (placeholder ? placeholder : 'Select option') : selectedVal}
          </Text>
          { !arrowicon ? (
            <Image
              source={require('../assets/images/chevron.png')}
              resizeMode='contain'
              style={{ width: 20, height: 20 }}
            />
          ) : arrowicon }
        </TouchableOpacity>
      )}

      {dropdown && (
        <Animated.View style={[{ maxHeight: animatedValue }, styles.dropdown, dropdownStyles]}>
          <FlatList
            data={filteredData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10 }}
            nestedScrollEnabled={true}
            initialNumToRender={15}
            maxToRenderPerBatch={15}
            windowSize={10}
            {...flatListProps}
          />
          {filteredData.length === 0 && (
            <TouchableOpacity
              style={[styles.option, dropdownItemStyles]}
              onPress={() => {
                setSelected(undefined);
                setSelectedVal("");
                slideup();
                setTimeout(() => {
                  setFilteredData(data);
                  setSearchQuery("");
                }, 800);
              }}
            >
              <Text style={[{ fontFamily }, dropdownTextStyles]}>{notFoundText}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default SelectList;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginTop: 10,
    overflow: 'hidden'
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    overflow: 'hidden'
  },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    opacity: 0.9
  }
});
