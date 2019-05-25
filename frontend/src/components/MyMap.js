import React, {Component} from 'react'
import {YMaps, Map} from 'react-yandex-maps'

class MyMap extends Component {

    render() {
        return (
            <YMaps>
                <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </YMaps>
        )
    }
}

export default MyMap