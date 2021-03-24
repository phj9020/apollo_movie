import React from 'react';
import styled from  'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height:380px;
    box-shadow: 0 10px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 10px;
    overflow: hidden;
`

const Poster = styled.div`
    background-image: url(${props => props.bg});
    width:100%;
    height:100%;
    background-size: cover;
    background-position: center center;
`

function Movie({id, bg}) {
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
        </Container>
    )
}

export default Movie;
