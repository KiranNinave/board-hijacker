import React, { useState } from 'react';
import {  View, StyleSheet, ActivityIndicator, FlatList, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

import getResponsiveDimention from './utils/getResponsiveDimention';

console.log("calculation", getResponsiveDimention(653));


const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
  });
  const [ loading, setLoading ] = useState(false);
  const [ channels, setChannels ] = useState([
    {
      chanel: 1,
      name: 'chanel 1',
      status: 0,
    },
    {
      chanel: 2,
      name: 'chanel 2',
      status: 0,
    },
    {
      chanel: 3,
      name: 'chanel 3',
      status: 0,
    },
    {
      chanel: 4,
      name: 'chanel 4',
      status: 0,
    },
    {
      chanel: 5,
      name: 'chanel 5',
      status: 0,
    },
    {
      chanel: 6,
      name: 'chanel 6',
      status: 0,
    },
    {
      chanel: 7,
      name: 'chanel 7',
      status: 0,
    },
    {
      chanel: 8,
      name: 'chanel 8',
      status: 0,
    },
  ]);

  const renderHeader = () => {
    return (
      <View style={styles.header} >
        <Text style={styles.title} >Remote</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={StyleSheet.flatten([styles.chanel, { marginRight: index % 2 === 0 ? getResponsiveDimention(35) : 0 }])} >
        <Feather name="activity" size={getResponsiveDimention(72)} color="#FFF" />
        <View style={styles.chanelContentContainer} >
          <Text style={styles.chanelName} >{item.name}</Text>
          <Text style={styles.chanelStatus}>{item.status === 0 ? "Off":  "On"}</Text>
        </View>
      </View>
    );
  }

  const renderItemSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  }

  const renderFooter = () => {
    return (
      <View style={styles.footer} >
        <View style={styles.toolbarSeparatorContainer} >
          <View style={styles.toolbarSeparator} />
        </View>
        <View style={styles.toolbarContainer} >
          <View style={styles.toolbarButton} >
          <MaterialIcons name="mode-edit" size={getResponsiveDimention(59.6)} color="#FFF" />
          </View>
          <View style={styles.toolbarButton} >
          <MaterialIcons name="settings" size={getResponsiveDimention(62.09)} color="#FFF" />
          </View>
          <View style={styles.toolbarButton} >
          <MaterialIcons name="nightlight-round" size={getResponsiveDimention(62.09)} color="#FFF" />
          </View>
        </View>
        <View style={styles.voiceInputContainer} >
        <MaterialIcons name="mic" size={getResponsiveDimention(100)} color="#FFF" />
        </View>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.safeArea} >
      <StatusBar style="light" />
      <View style={styles.container} >
        {
          loading ? (
            <View style={styles.loadingContainer} >
              <ActivityIndicator size="large" color="#E1F488" />
            </View>
          ) : (
            <View style={styles.contentContainer} >
              <FlatList 
                ListHeaderComponent={renderHeader}
                data={channels}
                renderItem={renderItem}
                ItemSeparatorComponent={renderItemSeparator}
                keyExtractor={(item) => `chanel${item.chanel}`}
                numColumns={2}
                ListFooterComponent={renderFooter}
              />
            </View>
          )
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000"
  },
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    paddingLeft: getResponsiveDimention(50),
    paddingRight: getResponsiveDimention(50),
  },
  header: {
    width: "100%",
    height: getResponsiveDimention(350),
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: getResponsiveDimention(100)
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: getResponsiveDimention(120),
    lineHeight: getResponsiveDimention(180),
    color: '#FFF',
    
  },
  chanel: {
    paddingLeft: getResponsiveDimention(57.26),
    paddingRight: getResponsiveDimention(50),
    width: getResponsiveDimention(653),
    height: getResponsiveDimention(314),
    borderRadius: getResponsiveDimention(100),
    overflow: 'hidden',
    backgroundColor: '#393A35',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
  },  
  chanelContentContainer: {
    marginLeft: getResponsiveDimention(40),
  },
  chanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: getResponsiveDimention(48),
    lineHeight: getResponsiveDimention(72),
    color: "#FFFFFF",
    textTransform: 'capitalize'
  },
  chanelStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: getResponsiveDimention(48),
    lineHeight: getResponsiveDimention(60),
    color: "rgba(255, 255, 255, 0.4)",
    textTransform: 'capitalize'
  },
  separator: {
    width: "100%",
    height: getResponsiveDimention(35),
  }, 
  footer: {
    marginTop: getResponsiveDimention(80),
    width: '100%',
  },
  toolbarSeparatorContainer: {
    width: '100%',
    height: getResponsiveDimention(18),
    display: 'flex',
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:'center'
  },
  toolbarSeparator: {
    width: getResponsiveDimention(100),
    height: getResponsiveDimention(18),
    borderRadius: getResponsiveDimention(60),
    overflow: 'hidden',
    backgroundColor: "#393A35",
  },  
  toolbarContainer: {
    marginTop: getResponsiveDimention(50),
    width: '100%',
    height: getResponsiveDimention(165),
    display: 'flex',
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems:"center",
  },
  toolbarButton: {
    width: getResponsiveDimention(386.33),
    height: getResponsiveDimention(165.57),
    borderWidth: getResponsiveDimention(1),
    borderColor: "#FFF",
    borderStyle: 'solid',
    borderRadius: getResponsiveDimention(85),
    overflow: 'hidden',
    display: 'flex',
    justifyContent:"center",
    alignItems:"center"
  },
  voiceInputContainer : {
    marginTop: getResponsiveDimention(50),
    width: '100%',
    height: getResponsiveDimention(730),
    backgroundColor: "#393A35",
    borderRadius: getResponsiveDimention(90),
    overflow: "hidden",
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  }
})

export default App;