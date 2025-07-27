import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/lottoProgram.css';
import ButtonLotto from '../components/ButtonLotto';
import SystemLotto from '../components/SystemLotto';
import UserLotto from '../components/UserLotto';
import { useReducer } from 'react';

// 로또 프로그램 컴포넌트
function LottoProgram(props) {

    const [lottoList, setLottoList] = useState([]);           // 로또번호 리스트
    const [userList, setUserList] = useState([]);             // 유저로또번호 리스트
    const [visible, setVisible] = useState(false);            // 로또 번호 보여줄지 말지 상태
    const [userVisible, setUserVisible] = useState(false);    // 유저 로또 번호 보여줄지 말지 상태
    const [userResult,setuserResult]=useState([]);            // 당첨 결과 담을 리스트
    const [mode, setMode]=useState('user');                   // 모드 설정(user:번호만 / result:결과)

    // 로또 번호 생성
    const createLotto = () => {
        // 로또 번호 담을 배열
        const nums = [];
        // 로또 번호 6개
        while (nums.length < 6) {
            // 1~45 사이의 숫자 랜덤생성
            const lottoNum = Math.floor(Math.random() * 45) + 1;
            // 중복체크해서 배열에 추가
            if (!nums.includes(lottoNum)) {
                nums.push(lottoNum);
            }
        }

        // 보너스번호
        let bonusNum;
        // 보너스번호 랜덤 생성
        do{
            bonusNum = Math.floor(Math.random() * 45) + 1;
            // 중복이면 다시 생성
        } while (nums.includes(bonusNum));
        
        // 최종 로또 번호와 보너스번호
        setLottoList([...nums, bonusNum]);
        // 로또 번호 보여주기
        setVisible(true);

    }

    // 유저 로또 번호 생성
    const userLotto = () => {
        // 유저 로또 5줄 생성
        const userLottos = Array.from({ length: 5 }, () => {
            // 유저 로또 번호 담을 배열
            const userNums = [];
            // 유저 로또 번호 6개
            while (userNums.length < 6) {
                // 1~45 사이의 숫자 랜덤생성
                const num = Math.floor(Math.random() * 45) + 1;
                // 중복체크해서 배열에 추가
                if (!userNums.includes(num)) {
                    userNums.push(num);
                }
            }
            return {userNums};
        });
        // 최종 유저 로또 번호
        setUserList(userLottos);
        // 로또 번호 보여주기
        setUserVisible(true);
        // user 모드 : 번호만 보여주기
        setMode('user');

    }

    // 비교 및 등수 확인
    const compareLotto =()=>{
        // 리스트가 없거나 리스트안에 번호가 없으면 알려주기
        if(!lottoList || lottoList.length === 0 ){
            alert('로또 리스트를 생성해주세요')
            return false;
        }else if(!userList ||userList.length === 0){
            alert('유저 리스트를 생성해주세요')
            return false;
        }

        // 로또 번호
        const winNum = lottoList.slice(0,6);
        // 보너스 번호
        const bonusNum = lottoList[6];
        
        // 유저 로또리스트와 당첨번호 비교
        const result = userList.map(({userNums})=>{
            // 당첨번호와 일치하는 번호
            const userWin = userNums.filter(num => winNum.includes(num));
            // 보너스번호와 일치하는 번호
            const bonusWin = userNums.includes(bonusNum);
            // 당첨번호 개수
            let count =  userWin.length;
            
            // 등수 표시
            let rank = '';
            if(count === 6){
                rank = '1등';
            }else if(count === 5 && bonusWin){
                rank = '2등';
            }else if(count === 5){
                rank = '3등';
            }else if(count === 4){
                rank = '4등';
            }else if(count === 3){
                rank = '5등';
            }else{
                rank = '낙첨'
            }
            // 유저번호, 당첨번호, 등수 결과
            return { userNums,userWin, rank };

        })     

        // 당첨번호 결과
        setuserResult(result);
        // result 모드 : 당첨결과 보여주기
        setMode('result');

    }


    return (
        <div className='container'>
            <div className='m-5 text-center'>
                <h1>로또 프로그램</h1>
            </div>
            <div className='contents'>
                <ButtonLotto createLotto={createLotto}
                    userLotto={userLotto}
                    compareLotto={compareLotto} />
                <SystemLotto lottoList={lottoList}
                    visible={visible} />
                <UserLotto userList={userList}
                    userResult={userResult}
                    userVisible={userVisible}
                    mode={mode} />
            </div>
        </div>
    );
}

export default LottoProgram;