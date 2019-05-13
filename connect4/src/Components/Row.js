import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import CellComponent from './Cell';

const Row = styled.div`
  display: flex; 
  justify-content: space-around; 
  background-color: yellow;
  width: 100%; 
`;

function RowComponent(props) {
    return (
        <Row>
            {props.row.map(cell => (
                <CellComponent cell={cell} />
            ))}
        </Row>
    )
}

RowComponent.propTypes = {
    row: PropTypes.array
}

export default RowComponent;