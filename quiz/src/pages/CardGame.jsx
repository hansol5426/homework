import React, { useState } from 'react';
import '../assets/css/cardGame.css';
import Card from '../components/Card';

function CardGame(props) {

    const [pcCard, setPcCard] = useState([]);
    const [userCard, setUserCard] = useState([]);
    const [checkbox, setCheckbox] = useState([]);
    const [started, setStarted] = useState(false);


    // 시작
    const startCard = () => {
        // 새로운 pc카드 배열 초기화
        const newPcCard = [];
        // pc카드 랜덤으로 2장 뽑기
        while (newPcCard.length < 2) {
            const val = Math.floor(Math.random() * 20) + 1;
            // 배열에 없는 숫자일 때만 추가
            if (!newPcCard.includes(val)) {
                newPcCard.push(val);
            }
        }
        // pc카드 배열에 뽑은 숫자 넣기
        setPcCard(newPcCard);
        console.log(newPcCard);

        // 새로운 user카드 배열 초기화
        const newUserCard = [];
        // user카드 랜덤으로 5장 뽑기
        while (newUserCard.length < 5) {
            const val = Math.floor(Math.random() * 20) + 1;
            // 배열에 없는 숫자일 때만 추가
            if (!newUserCard.includes(val)) {
                newUserCard.push(val);
            }
        }
        // user카드 배열에 뽑은 숫자 넣기
        setUserCard(newUserCard);
        // 시작 버튼 비활성화하기
        setStarted(true);

    }


    // 선택
    const selectCard = () => {
        // 카드 생성 안했으면 선택하라고 알려주기
        if (userCard.length === 0) {
            alert('카드를 생성해주세요');
            return;
        }
        // 카드 2개 선택하게 하기
        if (checkbox.length !== 2) {
            alert("카드를 2개 선택해주세요");
            return;
        }

        // pc / user 카드 합계 구하기
        const pcCardSum = pcCard.reduce((sum, num) => sum + num, 0);
        const userCardSum = checkbox.reduce((sum, num) => sum + num, 0);

        console.log(pcCardSum, userCardSum);

        // user의 합이 크면 user 승
        if (pcCardSum < userCardSum) {
            alert('user님이 승리하셨습니다.');
            return;
            // pc의 합이 크면 user 패    
        } else if (pcCardSum > userCardSum) {
            alert('user님이 패배하셨습니다.');
            return;
            // 같으면 무승부
        } else {
            alert('무승부입니다.');
            return;
        }

    }

    // 리셋
    // 전부 초기화
    const resetCard = () => {
        setPcCard([]);
        setUserCard([]);
        setCheckbox([]);
        setStarted(false);
    }

    // 체크박스 상태 변경
    const changeCheckbox = (e) => {
        // 체크박스의 값 숫자로 변환
        const value = Number(e.target.value);
        // 체크박스에 체크되어 있으면 checked
        const checked = e.target.checked;

        // 체크박스가 체크되어 있는 상태
        if (checked) {
            // 체크박스 2개 초과로 선택하는 것 막기
            if (checkbox.length >= 2) {
                alert("2개의 카드를 선택해주세요");
                // 체크된 거 풀기
                e.target.checked = false;
                return;
            }
            // 선택된 카드 추가
            setCheckbox(prev => [...prev, value]);
        } else {
            // 선택 해제된 카드 제거
            setCheckbox(prev => prev.filter(card => card !== value));
        }

    }

    return (
        <>
            <main className='container'>
                <section className='contents'>
                    {
                        userCard?.map((cardBoard, index) =>
                            <Card key={index}>
                                <input type='checkbox' name='checkbox' value={cardBoard} onChange={changeCheckbox}></input>
                                <p>{cardBoard}</p>
                            </Card>
                        )

                    }
                </section>
                <section className='btn-box'>
                    <button type='button' className='btn' disabled={started} onClick={startCard}>시작</button>
                    <button type='button' className='btn' onClick={selectCard}>선택</button>
                    <button type='button' className='btn' onClick={resetCard}>리셋</button>
                </section>
            </main>
        </>
    );
}

export default CardGame;