import React,{useEffect,useState} from 'react';
import {View,Text,Image,TouchableOpacity,ScrollView,StyleSheet,Share,Linking} from 'react-native'

const Result = ({navigation,route}) => {

    const [state, setState] = useState({
        desc:'',
        //문제 이미지가 이 결과 페이지로 넘어와 세팅 되기 전엔 
        //이미지 엘리먼트의 source.uri 가 비어있는 상태이므로 준비 이미지를 미리 세팅!
        image:'https://spartacodingclub.kr/static/css/images/logo.png',
        question:'',
        answer:''
    })
    useEffect(()=>{
        const { desc,image,question,answer } = route.params;
        navigation.setOptions({
            title:'심리 테스트 결과는?'
        })
        setState({
            desc:desc,
            image:image,
            question:question,
            answer:answer
        })
    },[])

    const goMain = () => {
        navigation.navigate("TabNavigator")
    }

    const doShare = () => {
        //Share의 share 함수를 가져와 쓴다.
        
        Share.share({
            message:`${state.question} \n\n ${state.answer} \n\n ${state.desc}`,
        });
        //Linking.openURL("http://www.naver.com")
    }

    return (
        <View style={styles.container}>
             <Image source={{uri:state.image}} resizeMode="cover" style={styles.resultImage}/>
             {/* 답안이 길 수도 있으니 스크롤 뷰로 처리! */}
             <ScrollView style={styles.resultPannel}>
                <Text style={styles.resultDesc}>{state.desc}</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={()=>goMain()}>
                        <View style={styles.button01}><Text style={styles.buttonText}>메인으로 가기</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>doShare()}>
                        <View style={styles.button02}><Text style={styles.buttonText}>결과&문제 공유하기</Text></View>
                    </TouchableOpacity>
                </View>
             </ScrollView>
        </View>
    )
}

export default Result

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
    },
    resultImage: {
        height:100
    },resultPannel: {
        margin:30,
        flex:1,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:10,
        padding:20,
       
        
    },
    resultDesc: {
        color:'#fff',
        lineHeight:30
        
    },buttonGroup: {
        flex:1,
        padding:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },button01: {
        backgroundColor:'hotpink',
        padding:10,
        borderRadius:10,
    },button02: {
        backgroundColor:'green',
        padding:10,
        borderRadius:10
    },buttonText:{
        fontWeight:"700"
    }

})