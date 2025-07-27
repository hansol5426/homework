import React, { useState } from 'react';
import '../assets/css/systemLotto.css';
import { styled } from 'styled-components';

// 로또 번호 박스 CSS
const LottoDiv = styled.div`
    margin: 20px auto;
    width: 99%;
    height: 100px;
    background-color: rgba(211, 211, 211, 0.322);
    border: 1px solid  rgb(211, 211, 211);
`;

// 로또 번호 컴포넌트
function SystemLotto({ lottoList, visible }) {
    return (
        <>
            <div className='text-center'>
                <h3>로또 번호</h3>
            </div>
            {/* 버튼 누르면 실행 */}
            {visible ? (
                <LottoDiv>
                    <div className='ball-item'>

                        {
                            lottoList.slice(0, 6)?.map((lottoNum, index) => (
                                <div className="ball" key={index}>{lottoNum}</div>
                            ))
                        }
                        <span> 보너스번호 +</span>
                        <div className="ball">{lottoList[6]}</div>
                    </div>
                </LottoDiv>
            ) :
                // 버튼 안눌렀을 때 실행
                <LottoDiv className='lotto-text'>
                    <span>
                        로또 번호를 생성해주세요.</span>
                </LottoDiv>}
        </>
    );
}

export default SystemLotto;