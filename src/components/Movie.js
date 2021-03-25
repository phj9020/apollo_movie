import React from 'react';
import styled from  'styled-components';
import {Link} from 'react-router-dom';
import {gql, useMutation } from '@apollo/client';

const Container = styled.div`
    width: 100%;
    height:400px;
    box-shadow: 0 10px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 7px;
    background-color: transparent;
`

const Poster = styled.div`
    background-image: url(${props => props.bg});
    width:100%;
    height:100%;
    background-size: cover;
    background-position: center center;
    border-radius:7px;
    margin-bottom: 5px;
`

const Button = styled.button`
    display:flex;
    color: #f42952;
    font-weight: bold;
    border: 1px solid #f42952;
    background-color: white;
    cursor: pointer;
    
    :focus {
        outline: none;
    }
`

const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client 
    }
`

function Movie({id, bg, isLiked}) {
    const [toggleMovie] = useMutation(LIKE_MOVIE,  {
        variables: { id: parseInt(id), isLiked: isLiked}
    });
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
            <Button onClick={ toggleMovie }>{isLiked ? "Unlike" : "Like"}</Button>
        </Container>
    )
}

export default Movie;
