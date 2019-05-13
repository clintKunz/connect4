import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
`;

function CellComponent(props) {
    return (
        <Cell>{props.cell === null? 'e' : props.cell === 1? 'x': 'o'}</Cell>
    )
}

CellComponent.propTypes = {
    cell: PropTypes.string
}

export default CellComponent; 