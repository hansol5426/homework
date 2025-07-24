import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/bookStore.css';
import LoginUser from '../components/LoginUser';
import RentalList from '../components/RentalList';
import AllList from '../components/AllList';
import { useState } from 'react';
import { useReducer } from 'react';
import { BookStoreContext } from '../context/BookStoreContext';

// 도서 초기 데이터 설정
const initBooks = [
    { id: 1, title: '책1', status: '대여가능', rented: null },
    { id: 2, title: '책2', status: '대여가능', rented: null },
    { id: 3, title: '책3', status: '대여가능', rented: null }
];

// 도서 state 관리 reducer
const bookListReducer = (state, action) => {
    switch (action.type) {
        // 'borrow' 시 대여중 상태로 변경
        case 'borrow':
            return state.map(book =>
                // 대여할 도서 아이디랑 일치 시
                book.id === action.payload.bookId
                    // 상태를 대여중으로 변경하고 대여자 목록의 추가
                    ? { ...book, status: '대여중', rented: action.payload.userId }
                    : book
            );
        // 'returnBook' 시 대여가능 상태로 변경    
        case 'returnBook':
            return state.map(book =>
                // 반환할 도서 아이디가 배열에 포함되면
                action.payload.includes(book.id)
                    // 상태 초기화하고 대여자 목록에서 삭제
                    ? { ...book, status: '대여가능', rented: null }
                    : book
            );
        // 'addBook' 시 새로운 도서 추가     
        case 'addBook':
            return [...state, action.payload];
        // 'delBook' 시 도서 삭제       
        case 'delBook':
            return state.filter(book => book.id !== action.payload);
        // 그외는 현재 상태    
        default:
            return state;
    }
}


function BookStore(props) {

    const [users, setUsers] = useState([]);    // 사용자 목록
    const [currentUser, setCurrentUser] = useState(null);    // 현재 로그인 사용자
    const [book, dispatch] = useReducer(bookListReducer, initBooks);   // 도서 목록
    const [checked, setChecked] = useState([]);   // 체크박스

    // context로 공유
    const list = {
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        book,
        dispatch,
        checked,
        setChecked,
    }


    return (
        <>
            <BookStoreContext.Provider value={list}>
                <div className='container'>
                    <div className='contents'>
                        <h1>도서 관리 프로그램</h1>
                        <div className='inner-box' >
                            <LoginUser />
                            <RentalList />
                            <AllList />
                        </div>
                    </div>
                </div>
            </BookStoreContext.Provider>
        </>
    );
}

export default BookStore;