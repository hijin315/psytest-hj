import React,{useEffect} from "react";


import {Platform} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from '../page/Main';
import History from '../page/History';
import {Ionicons} from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const TabNavigator = ({navigation,route}) =>{
  
    useEffect(()=>{
        navigation.setOptions({
            title:" 심리테스트"
        })
    },[])


    return (
    <Tabs.Navigator
        screenOptions={({route}) => ({
            tabBarIcon:({focused}) =>{

              //현재 이 앱을 구동하고 있는 디바이스가 뭔지 Platform.OS 을 통해 확인 할 수 있음
                let iconName = Platform.OS === "ios" ? "ios-" : "md-"
              
                  if (route.name === "Main") {
                    iconName += "list";
                  } else if (route.name === "History") {
                    iconName += "heart";
                  }
                  return (
                    <Ionicons
                      name={iconName}
                      color={focused ? "hotpink" : "grey"}
                      size={26}
                    />
                  );
            }
        })}
        tabBarOptions={{
            showLabel: false,
            // 이름을 보여줄지 말지를 정하는 코드
            style: {
              backgroundColor: "black",
              borderTopColor: "black",
              height:50
            }
        }}
    >
        
        <Tabs.Screen name="Main" component={Main}/>
        <Tabs.Screen name="History" component={History}/>
        
    </Tabs.Navigator>)
}

export default TabNavigator