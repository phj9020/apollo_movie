import React from 'react';
import styled from  'styled-components';
import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';


const Container = styled.div`
    width:100%;
    height:100vh;
    background: linear-gradient(90deg, rgba(241,24,102,1) 41%, rgba(255,106,0,1) 86%);
    display:flex;
    justify-content: space-around;
    align-items: center;
    color:white;
`

const Column = styled.div`
    width:35%;
`

const Title = styled.h1`
    font-size:40px;
    margin-bottom:20px;
    `

const Subtitle = styled.h4`
    font-size:20px;
    margin-bottom:15px;
`

const Description = styled.p`
    width: 100%;
    font-size: 16px;
    word-wrap: break-word;
    text-align: justify;
    line-height: 1.5;
`

const Poster = styled.div`
    width: 20%;
    height: 60%;
    background: url(${prop => prop.bg}) no-repeat center center;
    background-size: cover;
`



const GET_MOVIE_DETAIL = gql`
    query getMovie($id: Int!) {
        movie(id: $id){
            title
            description_intro
            medium_cover_image
            language
            rating
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
        <Container>
            <Column>
                <Title>{loading ? "Loading...⌛" : data.movie.title}</Title>
                {!loading && data.movie && 
                    <>
                        <Subtitle>Language: {data.movie.language}</Subtitle>
                        <Subtitle>Rate: {data.movie.rating}</Subtitle>
                        <Description>{data.movie.description_intro}</Description>
                    </>
                }
            </Column>
            {!loading && data.movie && <Poster bg={data.movie.medium_cover_image}></Poster> }
        </Container>

    )
}

export default Detail;
