import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';

const GET_MOVIE_DETAIL = gql`
    query getMovie($id: Int!) {
        movie(id: $id){
            id
            title
            description_intro
            medium_cover_image
            genres
        }
    }
`;


function Detail() {
    const {id} = useParams();
    const {loading, data} = useQuery(GET_MOVIE_DETAIL, {
        variables: { id: parseInt(id) }
    });

    console.log(loading, data)

    if(loading) {
        return "laoding...."
    }
    if(data && data.movie) {
        return data.movie.title
    }
}

export default Detail;
