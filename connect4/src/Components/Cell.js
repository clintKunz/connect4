import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Cell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue; 
    width: 100%;  
`;

const RedCell = styled(Cell)`
    background-color: red;
`;

const GreenCell = styled(Cell)`
    background-color: green;
`;

function CellComponent(props) {
    return (
        <>
            {props.cell === null? <Cell/> : props.cell === 1? <RedCell/>: <GreenCell/>}
        </>
    )
}

CellComponent.propTypes = {
    cell: PropTypes.string
}

export default CellComponent; 