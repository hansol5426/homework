import React, { useState } from 'react';
import '../assets/css/buttonLotto.css'
import SystemLotto from './SystemLotto';

// 버튼 컴포넌트
function ButtonLotto({ createLotto, userLotto, compareLotto }) {
    return (
        <>
            <div className='btn-box'>
                <button type='button'
                    className='btn btn-info'
                    onClick={createLotto}>로또 생성
                </button>
                <button type='button'
                    className='btn btn-primary'
                    onClick={userLotto}>유저 로또
                </button>
                <button type='button' 
                    className='btn btn-success'
                    onClick={compareLotto}>비교</button>
            </div >
        </>
    );
}

export default ButtonLotto;