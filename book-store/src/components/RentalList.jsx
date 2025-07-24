import React from 'react';
import { useContext } from 'react';
import '../assets/css/rentallist.css';
import { BookStoreContext } from '../context/BookStoreContext';


function RentalList(props) {

    // 공유 받은 상태
    const { setUsers, book, dispatch, checked, setChecked, currentUser, setCurrentUser } = useContext(BookStoreContext);


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


    // 반납
    const returnBook = () => {
        // 선택한 도서 없음
        if (checked.length === 0) {
            alert('반납하실 도서를 선택해주세요.')
            return;
        }
        // 로그인 한 사용자가 대여한 도서 중에서만 반납 가능하게
        const rentalList = checked.filter(bookId => 
            currentUser.rental.some(book => book && book.id === bookId)
        );

        // 반납 가능한 도서가 없는 경우 알림
        if (rentalList.length === 0) {
            alert('반납할 수 있는 도서가 없습니다.');
            return;
        }

        // 도서 상태 업데이트
        dispatch({
            type: 'returnBook',
            payload: rentalList
        });

         // 전체 사용자 목록에서 현재 사용자의 대여 목록 업데이트
        setUsers(prevUsers => 
            prevUsers.map(user => 
                // 현재 로그인한 사용자라면 
                user.name === currentUser.name 
                    // 반납한 책 목록에서 제거
                    ? { ...user, rental: user.rental.filter(book => !rentalList.includes(book.id)) }
                    : user
            )
        );

        // 로그인 한 사용자 대여 목록도 업데이트
        // 다른 컴포넌트에서 공유되기 때문에 화면 갱신해줘야 함
        setCurrentUser({
            ...currentUser,
            rental: currentUser.rental.filter(book => !rentalList.includes(book.id))
        });

        // 체크 상태 초기화
        setChecked([]);

    };
   

    return (
        <>
            <section>
                <div className='rental-book m-3 mt-5'>
                    <h2>대여한 도서 목록</h2>
                    <button type='button'
                        className='btn btn-danger'
                        onClick={returnBook}
                        disabled={!currentUser || checked.length === 0} >반납</button>
                </div>
                <ul className='book-list'>
                    {/* 로그인 한 사용자의 대여 목록이 없는 경우 */}
                    {!currentUser?.rental || currentUser.rental.length === 0  ? 
                    (<span>대여한 도서 목록이 없습니다.</span>) :
                        (currentUser.rental
                            .map(rentalBook  => {
                                // 대여한 책의 상태 변경 위함
                                const bookState = book.find(b => b.id === rentalBook.id);
                                const bookDisplay = bookState ? bookState.status : '대여중';
                            return(

                            <li className='rental-item' key={rentalBook.id}>
                                <input type='checkbox'
                                    checked={checked.includes(rentalBook.id)}
                                    onChange={() => checkedList(rentalBook.id)} />
                                <span>{rentalBook.title} {bookDisplay}</span>
                            </li>
                        );
                    })
                )}
                </ul>
            </section>
        </>
    );
}

export default RentalList;