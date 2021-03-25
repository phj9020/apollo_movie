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

const Movies = styled.div`
    width: 100%;
    max-width:1200px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-gap: 25px;
    position: relative;
    top:-50px;
    margin: 0px auto;

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
            {!loading && data.movies && 
                <Movies>
                    {data.movies.map(movie => <Movie key={movie.id} id={movie.id} bg={movie.medium_cover_image}/> )}
                </Movies>
            }
        </Container>

    )
}

export default Home;
