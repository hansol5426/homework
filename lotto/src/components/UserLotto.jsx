import React from 'react';
import '../assets/css/userLotto.css';
import { styled } from 'styled-components';

// 유저 로또 번호 박스 CSS
const UserLottoDiv = styled.div`
    margin: 0 auto;
    width: 99%;
    height: 610px;
    background-color: rgba(211, 211, 211, 0.322);
    border: 1px solid  rgb(211, 211, 211);
`;

// 당첨 번호 로또 볼 CSS
const UserBallDiv = styled.div`
    background-color: ${({ isCorrect }) => (isCorrect ? '#ffbe33ff' : 'white')};
    border: ${({ isCorrect }) => (isCorrect ? '2px solid #ffa000' : '1px solid black')};
`;

// 유저 로또 번호 컴포넌트
function UserLotto({ userList,userResult, userVisible,mode }) {
    return (
        <>
            <div className='text-center'>
                <h3>유저 로또 번호</h3>
            </div>
            <div className='user-lotto'>
                <div >
                    {/* 버튼 누르면 실행 */}
                    {userVisible ? (
                        <UserLottoDiv>
                            <div>
                                {
                                    // 결과 모드일 때 userResult, 결과 모드가 아닐 때 userList 반복
                                    (mode === 'result' ? userResult:userList)?.map((row, index) => (
                                        <div className='user-lotto-row' key={index}>
                                                <div className="user-ball-item">
                                                    {
                                                        row.userNums?.map((num, i) => {
                                                            // 결과 모드일 때 일치하는 번호 색상 강조
                                                            const isCorrect= mode === 'result' && row.userWin.includes(num);
                                                            return(
                                                                <UserBallDiv className="user-ball" key={i} isCorrect={isCorrect}>
                                                                    {num}
                                                                </UserBallDiv>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            {/* 결과 모드에 등수 표시 */}
                                            <div className='user-lotto-rank'>
                                                <span>{mode === 'result' ? row.rank : ''}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </UserLottoDiv>
                    ) : (<UserLottoDiv className='user-lotto-text'>
                        <span >유저 로또 번호를 생성해주세요.</span>
                    </UserLottoDiv>)}
                </div>
            </div>
        </>
    );
}

export default UserLotto;