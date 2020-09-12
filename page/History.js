import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,ScrollView,Image,Platform} from 'react-native'
//파이어베이스 기능을 사용할 때는 항상 파이어베이스 연결 도구 가져와 준비하기
import {firebase_db} from "../firebaseConfig"

import Loading from "./Loading";
import Constants from 'expo-constants';

const History = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [history,setHistory] = useState([]);

    useEffect(()=>{     
        const user_id = Constants.installationId;  
        firebase_db.ref('/history/'+user_id).once('value').then((snapshot) => {
            let history = snapshot.val();
						//history를 콘솔 찍어 보면, 문제 번호 키에, 데이터가 연결되어 있는 구조인데
            //전체적으로 딕셔너리 구조라 반복문을 돌릴 수 없습니다.
            if(history){
                //딕셔너리의 값을 가지고 배열을 만드는 Object.values를 오랜만에 사용해봅시다
                setHistory(Object.values(history))
                setIsLoading(false)
            }
        });
    },[])

    console.log(history)
    return isLoading ? <Loading/> : (
        <ScrollView style={styles.container}>
            {history.map((h,i)=>{
                return (
                <View key={i} style={styles.listContainer}>
                    <Image source={{uri:h['image']}} resizeMode="cover" style={styles.listImagae}/>
                    <View style={styles.listContent}>
                        <Text style={styles.listTitle} numberOfLines={3}>{h['question']}</Text>
                        {/* 문장이 길다면 아래 속성으로 말줌임표 표현이 가능! */}
                        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listHighLight}>[내가 고른 답은?]</Text>
                        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listHighLight}>{h['answer']}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listHighLight}>{h['desc']}</Text>
                    </View>
                </View>)
            })}
            
        </ScrollView>
    )
}

export default History

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#000'
    },
    listContainer: {
        flex:1,
        flexDirection:'row',
        height: 150,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#fff',
        borderRadius:10,
        margin:20,
        overflow:'hidden'
    },
    listImagae: {
        flex:1,
        height:'100%',
        borderRadius:10
    },
    listContent: {
        flex:4,
        flexDirection:"column",
        padding:20
    },
    listHighLight: {
        color:"#fff"
    },
    listTitle: {
        color:"hotpink"
    },
    //준비화면 스타일
    readyContainer: {
      flex: 1,
      backgroundColor: '#000',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center'
    },
    readyText: {
      color:'#fff'
    }

})