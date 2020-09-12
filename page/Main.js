import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity,ImageBackground } from 'react-native';

//Main.js로 들어오면 폴더 경로가 바뀌므로 변경해줘야합니다.
//페이지라는 폴더에서 나가 컴포넌트 폴더로 들어가야 하므로
//../ <- 나가고 components 폴더로 들어갔습니다.
import ButtonCard from "../components/ButtonCard";
import Category from "../components/Category";


//이제 파이어베이스에서 가져올 테니까 주석처리!
// import data from "../data.json";

//파이어베이스를 사용할 땐 항상 설정 파일을 임포트하기
import {firebase_db} from "../firebaseConfig"
import category from "../category.json"

import Loading from "./Loading";
//책갈비에선 Main 컴포넌트에게 Props 형태로 
// 페이지 이동 객체 데이터를 전달해줍니다
export default Main = ({navigation}) => {

    //로딩 상태 관리
    const [isLoading,setIsLoading] = useState(true);

    //문제 데이터를 관리하는 상태입니다.
    const [questionState,setQuestionState] = useState([])
    //카테고리 데이터는 관리하는 상태입니다.
    const [categoryState,setCategoryState] = useState([])
    //선택한 카테고리에 맞는 문제 데이터를 저장하고 관리하는 상태입니다.
    const [cateQuestionState, setCateQuestionState] = useState([])

    const selectCategory = (category) => {
        console.log(category)
        //카테고리에 따라, 우리가 관리하던 문제 리스트 데이터(상태)를 새롭게 구성하면
        //화면이 다시 그려집니다. 즉, 리액트에서 화면은 데이터(상태)가 변경되면 새로운 데이터(상태)들로 다시 그려집니다.
        if(category == '전체'){
            setCateQuestionState(questionState)
        }else{
            setCateQuestionState(questionState.filter((d)=> d.category == category))
        }
    }

  //useEffect라는 함수에 콜백 함수를 첫번째 인자로, 두번 째 인자로는 리스트를 넘겨줍니다.
  //기본 사용법입니다.
  //그리고 이 콜백 함수 안에 자동으로 구현되어야 할 로직을 작성해 넣으면 됩니다.
  useEffect(()=>{
    console.log("나 처음이자 마지막으로 실행 된다~~")
    firebase_db.ref('/question').once('value').then((snapshot) => {
      console.log("파이어베이스에서 데이터 가져왔습니다!!")
      let question = snapshot.val();
      setQuestionState(question)
      setCategoryState(category.data)
      setCateQuestionState(question)
      setIsLoading(false)
    });
  },[])


  //그럼 상태에는 문제 데이터가 리스트형태로 들어 있곘죠? 콘솔에서 확인해보세요
  // console.log(categoryState)

  return isLoading ? <Loading/> : (
    <View style={styles.container}>
      <ScrollView>
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categoryState.map((c,i)=>{
                        //컴포넌트에 함수 이름 그대로 넘겨주면 됩니다!
                      return <Category key={i} title={c.title} selectCategory={selectCategory}/>
                    })}
                    
                  </ScrollView>
                </View>
                {/* 카드가 한 줄 씩 세개가 늘어날 영역 */}
                <View style={styles.vScrollView}>

                  {/*  jsx에서 자바스크립트를 사용하려면 중괄호 안에서 사용해야 합니다. */}

                  {/* map 반복문으로 컴포넌트를 여러번 반복 사용할 때는, 
                      반드시 컴포넌트 key 속성에 map 순회 인덱스 번호를 넘겨줘야 합니다
                      고유 하다는 것을 알려줘야 해서요!
                  */}
                  {cateQuestionState.map((data,i)=>{
		                 //카드 버튼에서 사용해야 하므로, navigation을 건네줍니다
                    return <ButtonCard key={i} 
                        idx={data.idx}
												title={data.title} 
												image={data.image} 
												navigation={navigation}/>
                  })}
                </View>
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
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
    vScrollView: {
      marginTop:20,
      //flexDirection 속성이 row면 우측으로 나열, column이면 수직으로 나열
      flexDirection: 'row',
      //flex:"wrap" 속성의 경우 박스들이 화면을 넘칠 때 자동으로 밑으로 떨어져 내려가 배치됨
      flexWrap:"wrap"
    },
  });