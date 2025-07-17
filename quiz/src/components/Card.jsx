import React from 'react';
import { styled } from 'styled-components';


const CardBox = styled.div`
        width: 120px;
        height: 170px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
`;

function Card({ children }) {
    return (
        <>
            <CardBox>
                <div>{children}</div>
            </CardBox>
        </>
    );
}

export default Card;