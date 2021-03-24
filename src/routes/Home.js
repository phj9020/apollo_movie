import React from 'react';
import {useQuery, gql} from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';

const Container = styled.div`
    text-align: center;
`

const Header =styled.header`
    width: 100%;
    height: 400px;
    background: linear-gradient(90deg, rgba(241,24,102,1) 41%, rgba(255,106,0,1) 86%);
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;

    h1 {
        color: white;
        font-size: 40px;
        font-weight: 800;
        margin-bottom: 30px;
    }
    p {
        color: white;
        font-size: 22px;
    }
`

const Loading = styled.div`
    width: 100%;
    height: 400px;
    color: #f42952;
    font-size: 20px;
    font-weight: 800;
    padding-top: 100px;
`



const GET_MOVIES = gql`
    {
        movies {
            id
            medium_cover_image
        }
    }
`;



function Home() {
    const { loading, data } = useQuery(GET_MOVIES);
    
    return (
        <Container>
            <Header>
                <h1>Apollo Movie</h1>
                <p>Get data using GraphQL</p>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            {!loading && data.movies && data.movies.map(movie => <Movie key={movie.id} id={movie.id} /> )}
        </Container>

    )
}

export default Home;
