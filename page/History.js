import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,ScrollView,Image,Platform} from 'react-native'


const History = ({navigation}) => {

  const [history,setHistory] = useState({
    "idx": 0,
    "category": "무의식심리",
    "title": "소름돋게 정확한 심리테스트 1",
    "question": "가을을 맞이하여 책장 정리을 하였는데 책상 위에 필름이 하나 있습니다 그래서 필름을 뽑아 보았습니다.\n\n거기서 어떤 사진이 나올 것인가?",
    "image": "https://glenncy.s3.ap-northeast-2.amazonaws.com/st/problem/image/640/1581409010980.jpg",
    "image_origin": "banner.png",
    "view": 0,
    "status": 1,
    "option01": null,
    "option02": null,
    "createdAt": "2020-02-09T15:34:27.000Z",
    "updatedAt": "2020-02-09T15:34:27.000Z",
    "answer": [
        {
            "idx": 1,
            "question_idx": 0,
            "answer_order": 1,
            "answer_title": "어린이 사진",
            "answer_image": "",
            "answer_origin": "",
            "answer_desc": "눈물과 인정에 약함",
            "status": 1,
            "option01": null,
            "option02": null,
            "createdAt": "2020-02-09T15:34:27.000Z",
            "updatedAt": "2020-02-09T15:34:27.000Z"
        },
        {
            "idx": 2,
            "question_idx": 0,
            "answer_order": 2,
            "answer_title": "도시의 야경",
            "answer_image": "",
            "answer_origin": "",
            "answer_desc": "인간 관계가 중요하다고 생각, 술에 의존",
            "status": 1,
            "option01": null,
            "option02": null,
            "createdAt": "2020-02-09T15:34:27.000Z",
            "updatedAt": "2020-02-09T15:34:27.000Z"
        },
        {
            "idx": 3,
            "question_idx": 0,
            "answer_order": 3,
            "answer_title": "산 풍경",
            "answer_image": "",
            "answer_origin": "",
            "answer_desc": "약간의 짐만 있어도 아주 불안해함",
            "status": 1,
            "option01": null,
            "option02": null,
            "createdAt": "2020-02-09T15:34:27.000Z",
            "updatedAt": "2020-02-09T15:34:27.000Z"
        },
        {
            "idx": 4,
            "question_idx": 0,
            "answer_order": 4,
            "answer_title": "동물",
            "answer_image": "",
            "answer_origin": "",
            "answer_desc": "이성으로부터 많은 호응, 자신보다는 남을 생각할 줄 안다",
            "status": 1,
            "option01": null,
            "option02": null,
            "createdAt": "2020-02-09T15:34:27.000Z",
            "updatedAt": "2020-02-09T15:34:27.000Z"
        }
    ]
  });
  return  (
    <ScrollView style={styles.container}>
        <View style={styles.listContainer}>
              <Image source={{uri:history.image}} resizeMode="cover" style={styles.listImagae}/>
              <View style={styles.listContent}>
                  <Text style={styles.listTitle} numberOfLines={3}>{history.question}</Text>
                  {/* 문장이 길다면 아래 속성으로 말줌임표 표현이 가능! */}
                  <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listHighLight}>[내가 고른 답]</Text>
                  <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listHighLight}>{history.answer[0].answer_title}</Text>
                  <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listHighLight}>{history.answer[0].answer_desc}</Text>
              </View>
          </View>
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
    }
   

})