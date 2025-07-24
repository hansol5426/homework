import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { BookStoreContext } from '../context/BookStoreContext';
import '../assets/css/alllist.css';


function AllList(props) {

    // 공유된 상태
    const { setUsers, book, dispatch, checked, setChecked, currentUser, setCurrentUser } = useContext(BookStoreContext);
    // 도서 추가할 상태
    const [input, setInput] = useState('');

    // 체크박스 상태 변경
    const checkedList = (bookId) => {
        setChecked(prev => {
            // 현재 체크되어 있는지
            const isChecked = prev.includes(bookId);
            return isChecked
                // 이미 체크되어 있으면 제거
                ? prev.filter(id => id !== bookId)
                // 체크 안되어 있으면 추가
                : [...prev, bookId];
        });
    }


    // 대여 가능 도서
    const borrowBook = (bookId) => {
        // 선택한 도서 정보
        const borrowedBook = book.find(b => b.id === bookId);
        // 도서가 없거나 대여중이면 대여 못함
        if (!borrowedBook || borrowedBook.status === '대여중') {
        alert('대여할 수 없는 도서입니다.');
        return;
        }

        // 도서 상태 업데이트
        dispatch({
            type: 'borrow',
            payload: {
                bookId,
                userId: currentUser.name
            }
        });

        // 전체 사용자 목록에서 현재 사용자의 대여 목록 업데이트
        setUsers(prevUsers => 
             prevUsers.map(user => 
                user.name === currentUser.name 
                    ? { ...user, rental: [...user.rental, borrowedBook] }
                    : user
            )
        );

        // 로그인 한 사용자 대여 목록도 업데이트
        // 다른 컴포넌트에서 공유되기 때문에 화면 갱신해줘야 함
        setCurrentUser({
            ...currentUser,
            rental: [...currentUser.rental, borrowedBook]
        });
    };


    // 도서 추가
    const addBook = () => {
        // 입력 값이 없으면 알려주기
        if (input.trim() === '') {
            alert('추가하실 도서를 입력해주세요.')
            return;
        }
        // 책들 중 가장 큰 id 값 찾아서 담기
        const maxId = book.reduce((max, book) => Math.max(max, book.id), 0);
        // 새로운 도서 객체
        const newBook = {
            // 가장 큰 id의 +1 값 => 중복되지 않음
            id: maxId + 1,
            title: input.trim(),
            status: '대여가능',
            rentedBy: null
        }

        // 도서 상태 업데이트
        dispatch({
            type: 'addBook',
            payload: newBook
        });

        // 입력창 비우기
        setInput('');

    }


    // 도서 삭제
    const delBook = (bookId) => {
        // 삭제해야 하는 도서 찾기
        const bookDelete = book.find(b => b.id === bookId);
        // 대여중인 도서는 삭제 불가
        if (bookDelete.status === '대여중') {
            alert('대여중인 도서는 삭제할 수 없습니다.');
            return;
        }
        // 삭제 확인용
        const isConfirm = confirm('정말 삭제하겠습니까?');
        if (!isConfirm) return;

        // 도서 상태 업데이트
        dispatch({
            type: 'delBook',
            payload: bookId
        });

    }

    return (
        <>
            <section className='book'>
                <div className='book-list-title m-3 mt-5'>
                    <h2>전체 도서 목록</h2>
                </div>
                <div className='book-box'>
                    <input type='text'
                        className='form-control mb-3'
                        placeholder='도서를 검색하세요.'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className='btn-box'>
                        <button type='button'
                            className='btn btn-info'
                            onClick={addBook}
                            disabled={!currentUser}
                        >추가</button>

                        <button type='button'
                            className='btn btn-success'
                            onClick={()=>{
                                // 체크된 도서 없으면 알려주기
                                if(checked.length === 0){
                                    alert('대여할 도서를 선택해주세요.');
                                    return;
                                }
                                // 체크된 도서중 대여 가능한 도서만
                                const availableBooks = checked.filter(bookId => {
                                    const selectedBook = book.find(b => b.id === bookId);
                                    return selectedBook.status === '대여가능';
                            });

                            // 대여 가능한 도서가 없다면 알려주기
                            if (availableBooks.length === 0) {
                                alert('대여 가능한 도서를 선택해주세요.');
                                return;
                            }
                            // 대여 가능한 도서 대여하기
                            availableBooks.forEach(bookId => borrowBook(bookId));
                            // 체크 초기화
                            setChecked([]);                        
                        }}
                            disabled={!currentUser || checked.length === 0}
                        >대여</button>

                        <button type='button'
                            className='btn btn-danger'
                            onClick={()=>{
                                // 삭제할 도서 없으면 알려주기
                                if (checked.length === 0) {
                                alert('삭제할 도서를 선택해주세요.');
                                return;
                                }
                              // 체크된 도서 삭제
                              checked.forEach(bookId => delBook(bookId));
                            // 체크 초기화
                            setChecked([]);
                            }}
                            disabled={!currentUser || checked.length === 0}
                        >삭제</button>
                    </div>
                </div>
                <div className='book-list-box'>
                    <ul className='book-all-list '>
                        {book?.length === 0 ? (<span>도서 목록이 없습니다.</span>) :
                            (book?.map(book =>(
                                <li className='book-item' key={book.id}>
                                    <input type='checkbox'
                                        checked={checked.includes(book.id)}
                                        onChange={() => checkedList(book.id)}
                                    />
                                    <span>{book.title} {book.status}</span>
                                </li>
                            )))}
                    </ul>
                </div>
            </section>
        </>
    );

}
export default AllList;