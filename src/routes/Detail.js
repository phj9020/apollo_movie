import React from 'react';
import styled from  'styled-components';
import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';
import Movie from '../components/Movie';

const Container = styled.div`
    width:100%;
    height:150vh;
    background: linear-gradient(90deg, rgba(241,24,102,1) 41%, rgba(255,106,0,1) 86%);
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:white;

`

const Firstblock= styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Column = styled.div`
    width:35%;
    @media (max-width: 768px) {
        width: 50%;
        margin-bottom: 20px;
  }
`

const Title = styled.h1`
    font-size:40px;
    font-weight: 700;
    margin-bottom:20px;
    `

const Subtitle = styled.h4`
    font-size:20px;
    margin-bottom:15px;
`

const Description = styled.p`
    width: 100%;
    font-size: 16px;
    text-align: justify;
    line-height: 1.5;
`

const Poster = styled.div`
    width: 30%;
    height: 60%;
    background: url(${prop => prop.bg}) no-repeat center center;
    background-size: contain;

    @media (max-width: 768px) {
        width: 50%;
  }
`


const Secondblock = styled.div`
    width: 100%;
    max-width: 1200px;
    height: 100%;
`

const Suggestions = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-gap: 25px;
    position: relative;
    margin: 0px auto;
`


const GET_MOVIE_DETAIL = gql`
    query getMovie($id: Int!) {
        movie(id: $id){
            id
            title
            description_intro
            medium_cover_image
            language
            rating
            isLiked @client
        }
        suggestions(id: $id) {
                id
                medium_cover_image
            }
    }
`;


function Detail() {
    const {id} = useParams();
    const {loading, data} = useQuery(GET_MOVIE_DETAIL, {
        variables: { id: parseInt(id) }
    });

    console.log(loading, data)

    return (
    <>
        <Container>
            <Firstblock>
                <Column>
                    <Title>{loading ? "Loading...⌛" : `${data.movie.title} ${data.movie.isLiked ? "👍" : "😀"}` }</Title>
                    <Subtitle>Language: {data?.movie.language}</Subtitle>
                    <Subtitle>Rate: {data?.movie.rating}</Subtitle>
                    <Description>{data?.movie.description_intro}</Description>
                </Column>
                <Poster bg={data?.movie?.medium_cover_image}></Poster>
            </Firstblock>
            {data && data.suggestions &&
                <Secondblock>
                    <Title>Suggestions</Title> 
                    <Suggestions>
                        {data.suggestions.map(suggest => <Movie key={suggest.id} id={suggest.id} bg={suggest.medium_cover_image} /> )}
                    </Suggestions>
                </Secondblock>
            }
        </Container>
    </>
    )
}

export default Detail;
