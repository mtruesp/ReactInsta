import React from 'react'
import { Container, Row, Col, InputGroup } from 'react-bootstrap'
import axios from 'axios'

import InputSearch from '../InputSearch/InputSearch'
import Images from '../Images/Images'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            searchText: '',
            images: []
        }
        this.onChangeText = this.onChangeText.bind(this)
        this.apiSearch = this.apiSearch.bind(this)
    }

    async apiSearch(){
        const response = await axios.get('https://api.unsplash.com/search/photos',
            {
                params: {
                    query: this.state.searchText
                },
                headers: {
                    Authorization: 'Client-ID Dm0wa503ICk8wDTvfJUVcgVc2s1OLETyND8amOYpkZs'
                }
            }
        )
        this.setState({images: response.data.results})
        // .then((response) => {
        //     console.log('Respuesta', response)
        // })
        // .catch((error) => {
        //     console.log('Error en la peticion por axios', error)
        // })

    }

    onChangeText(e){
        this.setState({searchText: e.target.value})
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <InputSearch apiSearch={this.apiSearch} onChangeText={this.onChangeText}/>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.images.map((image) => {
                            return (
                                <Col sm="4" key={image.id}>
                                    <Images imageUrl={image.urls.regular}></Images>
                                </Col> 
                            )
                        })
                        
                    }
                </Row>
            </Container>
        )
    }
}

export default App