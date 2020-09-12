import React from "react";
import {TouchableOpacity,View,Text,StyleSheet} from "react-native";

//넘겨 받은 함수명, 즉 속성명 그대로 받아서 사용하면 됩니다.
const Category = ({title,selectCategory}) => {
    return (
				// 버튼을 누르면 이 카테고리가 가지고 있는 타이틀을 함수로 넘겨줍니다.
        //타이틀은 곧 카테고리니까요!
        <TouchableOpacity onPress={()=>selectCategory(title)}>
            <View style={styles.category}><Text style={styles.categoryTitle}>{title}</Text></View>
        </TouchableOpacity >
    )
}

export default Category;


const styles = StyleSheet.create({
    category:{
        width:100,
        height:30,
        marginTop:30,
        marginRight:5,
        marginLeft:13,
        borderRadius:5,
        borderColor:'#fff',
        borderWidth:1,
        borderStyle:'solid'
      },
      categoryMain:{
        width:100,
        height:30,
        marginTop:30,
        marginRight:5,
        marginLeft:13,
        borderRadius:5,
        borderColor:'hotpink',
        borderWidth:1,
        borderStyle:'solid'
      },
      categoryMainTitle:{
        color:'hotpink',
        textAlign:'center',
        marginTop:6
      },
      categoryTitle: {
        color:'#fff',
        textAlign:'center',
        marginTop:6
      },
  });