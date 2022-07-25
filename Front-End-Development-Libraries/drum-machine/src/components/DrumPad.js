import React, { Component } from 'react';
import reproducirElementAudio from '../script.js/ReproducirAudioElemento';


class DrumPad extends Component {
    constructor(props) {
        super(props);

        this.reproducirAudio = this.reproducirAudio.bind(this);

        this.handlePress = this.handlePress.bind(this);
    }



    //Se ejecuta para inicializar el estado con la propiedad
    reproducirAudio() {

        //Hace al elemento audio reproducir el src
        reproducirElementAudio(this.props.instrumento.letra);

        //Envia el nombre al display
        this.props.mandarNombre(this.props.instrumento.nombre);


    }

    //Al presiona cada tecla

    handlePress(e) {

        if (e.keyCode === this.props.instrumento.codigoLetra) {
            this.reproducirAudio();

        }
    }

    //Se ejecuta cuando se monta el componente
    componentDidMount() {
        //Le añade a toda la web que cuando se ejecuta el disparador ( 1er input) , se ejecutara la segunda orden

        document.addEventListener('keydown', this.handlePress);

    }

    render() {

        const ins = this.props.instrumento; //Almacena el instrumento


        //Pedimos el
        var audio = require('../audio/' + ins.letra + '.mp3')

        return (<div className='drum-pad' id={ins.nombre} onClick={this.reproducirAudio}>


            <audio id={ins.letra} className='clip' src={audio} />

            {ins.letra}

        </div >);
    }
}

export default DrumPad;