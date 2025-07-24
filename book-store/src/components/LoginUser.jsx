import React, { useState } from 'react';
import '../assets/css/loginUser.css';
import { useContext } from 'react';
import { BookStoreContext } from '../context/BookStoreContext';
import { useEffect } from 'react';

function LoginUser(props) {

    // 공유 받은 state
    const { users, setUsers, currentUser, setCurrentUser } = useContext(BookStoreContext);
    // 선택한 사용자 저장
    const [selectedUser, setSelectedUser] = useState(null);

    // 처음 랜더링 될 때 초기화
    useEffect(() => {
        setUsers(
            [
                { name: '김철수', rental: [] },
                { name: '이명희', rental: [] }
            ]
        );
    }, []);

    // 셀렉트박스에서 사용자 선택
    const changeUser = (e) => {
        const selected = users.find(user => user.name === e.target.value);
        setSelectedUser(selected);
    }

    // 로그인 버튼 클릭 시 로그인 완료
    const Login = () => {
        if (!selectedUser) {
            alert('사용자를 선택해주세요.')
            return;
        }
        setCurrentUser(selectedUser);
    }


    return (
        <>
            <header className='header'>
                <div className='login-box'>
                    <select className='form-control'
                        name='userName'
                        value={selectedUser?.name}
                        onChange={changeUser}>
                        <option value='' hidden>로그인 할 사용자를 선택하세요</option>
                        {users?.map(user =>
                            <option key={user.name} value={user.name}>{user.name}</option>)}
                    </select>
                    <button type='button' className='btn btn-primary' onClick={Login}>로그인</button>
                </div>
                <div className='selected-user'>
                    <p>로그인된 사용자 : {currentUser ? currentUser.name : ''}</p>
                </div>
            </header>
        </>
    );
}

export default LoginUser;