import React from 'react';
import styled from  'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`

`

function Movie({id}) {
    return (
        <Container>
            <Link to={`/${id}`}>
                {id}
            </Link>
        </Container>
    )
}

export default Movie;
