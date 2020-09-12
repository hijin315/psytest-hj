import React,{useEffect,useState} from 'react';
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'

//파이어베이스 기능을 사용할 때는 항상 파이어베이스 연결 도구 가져와 준비하기
import {firebase_db} from "../firebaseConfig"

import Loading from "./Loading";
import Constants from 'expo-constants';


const Question = ({navigation,route}) => {

    const [isLoading, setIsLoading] = useState(true)
    //디테일 문제 페이지에서 문제를 관리할 상태 정의
    //기존에는 임시 데이터를 넣어놨지만 이제는 넣어줄 예정이므로 비워둡니다
    const [questionState, setQuestionState] = useState({})

    

    useEffect(()=>{
        //화면의 제목 변경하는 네이게이션 도구
        navigation.setOptions({
            title:'문제!!'
        })
        // 복습겸 다시 써보는 해체 할당 방식의 변수 정의!
        //넘겨 받은 데이터중에서 idx를 꺼냅니다
        const { idx } = route.params;
        firebase_db.ref('/question/'+idx).once('value').then((snapshot) => {
            let question = snapshot.val();
            setQuestionState(question)
            setIsLoading(false)
        });

    },[])

    const goResult = (a) => {

        const new_history = {
            
            question:questionState.question,
            image:questionState.image,
            question_idx:questionState.idx,
            answer_idx:a.idx,
            answer:a.answer_title,
            desc:a.answer_desc,
    
        }

        const user_id = Constants.installationId;
        console.log(questionState)
        console.log(new_history)
        console.log(user_id)

        
        firebase_db.ref('/history/'+user_id+'/'+ questionState.idx).set(new_history,function(error){
            console.log(error)
            if(error == null){
                //저장에 문제가 없을 경우에만 결과 페이지로 이동!
                navigation.navigate("Result",{
                    desc:a.answer_desc,
                    image:questionState.image,
                    question:questionState.question,
                    answer:a.answer_title
                })
            }
        });
        
    }

    return isLoading ? <Loading/> : (
     
        <View style={styles.container}>
            <Image source={{uri:questionState.image}} resizeMode="cover" style={styles.questionImage}/>
            <Text style={styles.questionTitle}>{questionState.title}</Text>
            <Text style={styles.question}>{questionState.question}</Text>
            <View style={styles.answerList}>
                <ScrollView>
                    {/* 문제에 딸린 답들을 나열 */}
                    {questionState.answer.map((a,i)=>{
                        //결과 화면에선 문제, 문제 이미지, 답, 해설 그리고 히스토리에 저장 할 문제 번호와 답안 번호를 goResult 함수에 넘겨줍니다.
                        return (
                        <TouchableOpacity 
                            key={i} 
                            style={styles.answerView} 
                            onPress={()=>goResult(a)}
                        >
                            <Text style={styles.answerText} >{Number(i + 1) + '.' + a.answer_title}</Text>
                        </TouchableOpacity>)
                    })}
                </ScrollView>
            </View>
            
        </View>

    )
}

export default Question

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        backgroundColor:"#000"
    },
    questionImage: {
        height:100
    },
    questionTitle: {
        padding:20,
        color:'hotpink',
    },
    question: {
        padding:20,
        fontSize:18,
        color:'#fff',
    },
    answerList: {
        flex:1,
        padding:20
    },
    answerView: {
        borderRadius:10,
        borderStyle:'solid',
        borderColor:"#fff",
        borderWidth:1,
        padding:30,
        marginBottom:10
    },
    answerText: {
        color:"#fff"
    }
})