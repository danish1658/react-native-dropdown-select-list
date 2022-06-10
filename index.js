import React from 'react';
import {View,Text,StyleSheet,Image, TouchableOpacity, ScrollView, Animated,TextInput} from 'react-native';


const SelectList = ({setSelected,placeholder,boxStyles,inputStyles,dropdownStyles,dropdownItemStyles,dropdownTextStyles,maxHeight,data}) => {



    const [dropdown, setDropdown] = React.useState(false);
    const [selectedval, setSelectedVal] = React.useState("");
    const [height,setHeight] = React.useState(200)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filtereddata,setFilteredData] = React.useState(data)


    const slidedown = () => {
        setDropdown(true)
        Animated.timing(animatedvalue,{
            toValue:height,
            duration:500,
            useNativeDriver:false,
            
        }).start()
    }
    const slideup = () => {
        
        Animated.timing(animatedvalue,{
            toValue:0,
            duration:500,
            useNativeDriver:false,
            
        }).start(() => setDropdown(false))
    }

    React.useEffect( () => {
        if(maxHeight)
            setHeight(maxHeight)
    },[maxHeight])


    return(
        <View>
            {
                (dropdown)
                ?
                    <View style={[styles.wrapper,boxStyles]}>
                        <View style={{flexDirection:'row'}}> 
                            <Image 
                                source={require('./assets/images/search.png')}
                                resizeMode='contain'
                                style={{width:20,height:20,marginRight:7}}
                            />
                            <TextInput 
                                placeholder='search'
                                onChangeText={(val) => {
                                    let result =  data.filter((item) => {
                                        toSearch = val.toLowerCase();
                                        row = item.value.toLowerCase()
                                        return row.search(toSearch) > -1;
                                    });
                                    setFilteredData(result)
                                }}
                                style={[{padding:0,height:20,width:'80%'},inputStyles]}
                            />
                           
                        </View>
                        
                    </View>
                :
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => slidedown()}>
                        <Text style={inputStyles}>{ (selectedval == "") ? (placeholder) ? placeholder : 'Select option' : selectedval  }</Text>
                        <Image 
                            source={require('./assets/images/chevron.png')}
                            resizeMode='contain'
                            style={{width:20,height:20}}
                        />
                    </TouchableOpacity>
            }
            
            {
                (dropdown)
                ?
                    <Animated.View style={{maxHeight:animatedvalue}}>
                        <ScrollView style={[styles.dropdown,dropdownStyles]} contentContainerStyle={{paddingVertical:10,}} nestedScrollEnabled={true}>

                            {
                                filtereddata.map((item,index) => {
                                    let key = item.key ?? item.value ?? item;
                                    let value = item.value ?? item;
                                    return(
                                        <TouchableOpacity style={[styles.option,dropdownItemStyles]} key={index} onPress={ () => {
                                            setSelected(key)
                                            setSelectedVal(value)
                                            slideup()
                                        }}>
                                            <Text style={dropdownTextStyles}>{value}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            
                            
                            
                        </ScrollView>
                    </Animated.View>
                :
                null
            }
            
            
        </View>
    )
}

export default SelectList;

const styles = StyleSheet.create({
    wrapper:{ borderWidth:1,borderRadius:10,borderColor:'gray',paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between' },
    dropdown:{ borderWidth:1,borderRadius:10,borderColor:'gray',marginTop:10},
    option:{ paddingHorizontal:20,paddingVertical:8 }
})