import React, { Component } from 'react';
import poner0 from '../scripts/PonerCero';
import TimerDashboard from './TimerDashboard';

const INICIALSTATE = { parado: true, minutos: 0, segundos: 0 };     //dEFINE EL ESTADO INICIAL

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = INICIALSTATE;

        this.startStop = this.startStop.bind(this);

        this.reset = this.reset.bind(this);

    }

    //Funciones del Componente


    //Cuando se monta el componente crae el intercalo
    componentDidMount() {

        this.crearIntervalo();

    }
    componentDidUpdate(prevProps) {


        //Si el tipo de temporizador a variado
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState(INICIALSTATE);    //Vuelve a poner el estado en original        


            //Elimina el antiguo intervalo
            clearInterval(this.intervalo)

            //Crea el nuevo Intercalo
            this.crearIntervalo();

        }

    }

    componentWillUnmount() {
        clearInterval(this.intervalo);
    }


    //Funciones

    //Cambia el estado del juego
    startStop() {

        //Los botones dejan de ser editables
        this.props.invertirBotones();

        this.setState({ parado: !this.state.parado });        //Invierte el vqalor de parado

    }


    //Se ejecuta cuando se desea resetar la aplicación
    reset() {

        this.pararSonido();             //Para el sonido

        this.props.reset();             //REINICIA LA APLICACCIÓN

        this.setState(INICIALSTATE);    //Vuelve a poner el estado en original        

        clearInterval(this.intervalo);  //Elimina el intervalo ya creado

        this.crearIntervalo();          //Crea otro intervalo

    }

    //Prepara el intervalo y lo pone en marcha
    crearIntervalo() {
        this.setState({ minutos: this.props.minutos });

        this.intervalo = setInterval(() => {

            //Restamos un segundo
            if (!this.state.parado) {

                var [minutos, segundos] = [this.state.minutos, this.state.segundos];

                if (0 < segundos) {
                    segundos--;
                }

                if (segundos === 0) {


                    if (minutos === 0) {

                        //Sis se acaba


                        this.setState({ minutos: minutos, segundos: segundos });

                        clearInterval(this.intervalo);

                        this.props.handleEnd();
                    }
                    else {

                        //Si el segundo es igual a menos
                        minutos--;

                        segundos = 59;
                    }

                }
                this.setState({ minutos: minutos, segundos: segundos });

            }
        }, 1000);
    }

    //Reproducir Sonido

    pitar() {

        var audio = document.getElementById('beep');

        audio.play();

        console.log("Se oye un pitido de fondo");

    }

    //Para el sonido

    pararSonido() {

        var audio = document.getElementById('beep');

        audio.pause();

        audio.currentTime = 0;

    }

    render() {
        //Añade  los 0 en caso de que haga falta
        var min = poner0(this.state.minutos);

        var seg = poner0(this.state.segundos);



        var tiempo = min + ":" + seg;


        var autoplay = tiempo === "00:00";
        //Almacena el audio

        const audio = require('../audio/beep.mp3');

        return (<div>

            <div id='timer-label'>
                {this.props.label}
            </div>

            <div id='time-left'>

                {tiempo}
            </div>


            {/*Etiqueta Audio*/}

            <audio id="beep" src={audio} autoPlay={autoplay} />




            <TimerDashboard pausado={this.state.parado} handleStartStop={this.startStop} handleReset={this.reset} />

        </div>);
    }
}

Timer.defaultProps = {


    label: "session"
}

export default Timer;