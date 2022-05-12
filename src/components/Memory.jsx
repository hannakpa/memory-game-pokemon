import { useState, useEffect } from 'react';
import Game from './Game';

const imagenes = [
    { "src": '/img/blastoise.jpg', matched:false },
    { "src": '/img/bulbasaur.jpg', matched:false },
    { "src": '/img/chansey.jpg', matched:false  },
    { "src": '/img/charmander.jpg', matched:false  },
    { "src": '/img/cubone.jpg', matched:false  },
    { "src": '/img/jigglypuff.jpg', matched:false  },
    { "src": '/img/koffing.jpg', matched:false  },
    { "src": '/img/pikachu.png', matched:false  },
    { "src": '/img/psyduck.jpg', matched:false  },
    { "src": '/img/squirtle.jpg', matched:false  }
]


function Memory() {

    const [tazos, setTazos] = useState([])
    const [turns, setTurns] = useState(0);//guardar el numero de vueltas que le da el jugador. para empezar sera 0. cada vez que se empiece un juego y se le de al boton de NEW GAME se llamara la funcion barajarImagenes y resetea turns a 0 otra vez.
    //crear States para cada eleccion
    const [firstTry, setFirstTry] = useState(null); //al elegir el primer tazo, el useState se actuliza con el id de ese tazo. lo mismo para el SecondTry. esto se elige desde el clickEvent que se pasa a Game->Tazo, en el reverso.
    const [secondTry, setSecondTry] = useState(null);
    //desactivado-desactivar el clic en los tazos
    const [desactivado, setDesactivado] =useState(false);



    ///funcion para duplicar el array y barajar
    const barajarImagenes = () => {
        const imagenesBarajadas = [...imagenes, ...imagenes] //duplica el array
            .sort(() => Math.random() - 0.5) /// sort ejecuta una funci'on para cada par de items de imagenesBarajadas
            //Math.random consigue un numero random entre 0 y 1. si sale un numero negativo, los items se quedar'an en el mismo lugar. si sale positivo, cambiaran de sitio
            .map((tazo) => ({ ...tazo, id: Math.random() }))
        //map es para ejecutar ahora una funci'on para cada uno de los items(tazo) ya barajados y anadirles una propiedad id.
        //se ponen llaves para devolver un objeto

        //teniendo en cuenta que quiero reutilizar la funcion barajarImagenes cuando quiera volver a empezar el juego, necesito asegurarme de que el firstTry y el secondTry est'en limpios y no tengan ningun valor del juego anterior
        setFirstTry(null);
        setSecondTry(null);
        ///ahora crear un State para guardar los tazos que salgan de esta ejecuci'on
        setTazos(imagenesBarajadas);
        setTurns(0)
    }
    //funci'on que se le pasara al onclick del reverso del tazo. comprobar primero con console.log(tazo): const handleTry = tazo => {console.log(tazo)};
    //aqui se manipulara el firstTry y secondTry.
    //si no tiene un valor, actualizar con el firstTry,
    //si ya tiene un valor, actualizar con el secondTry;
    const handleTry = tazo => {
        //si firstTry es null, entonces actualizar el FirstTry, si no es null y ya tiene un primer valor, adjudicarle el SecondTry
        firstTry ? setSecondTry(tazo) : setFirstTry(tazo);
        //ahora, comparar los tazos para ver si coinciden 
        //comparar usando el source
        //console.log(tazo)
    };
   


 ///comparacion de los tazos con useEffect
    useEffect (() => {
        if (firstTry && secondTry) {
            //durante la comparacion de los dos tazos quiero desactivar el funcionamiento de los demas. despues de la funcion vuelvo a activar en el reset.
            setDesactivado(true); 
            if (secondTry.src === firstTry.src) {
                //actualizamos el valor. para eso, primero coger la lista de tazos como argumento y hacerle un map.. se creara una funcion para cada tazo, que lo que har'a es comparar cada tazo con la primera prueba
                setTazos(prevTazos=>{
                    return prevTazos.map(tazo => {
                        //si el source del tazo cogido es igual al source del fristTry, entonces devolver el mismo tazo pero con la propiedad matched cambiada a true. los dos tazos cambiarian su propiedad matched a true. esto daria pie a que se quedaran a la vista los que han cambiado su matched a true.
                        if (tazo.src === firstTry.src) {
                            return{...tazo, matched: true}
                        } else {
                        //si no hacen match, devolver el objeto tazo simplemente tal cual estaba
                            return tazo
                        }
                    })
                });
                reset();
            } else {
                //console.log('not a match');
                //al girar los tazos, si el segundo no coincide se reseteara el firstTry y el SecondTry a null y se giraran boca abajo automaticamente casi sin tener tiempo para ver el segundo tazo. por eso se crea una funcion predefinida SETTIMEOUT que envuelve el reset para crear un delay antes de que se resetee y vuelva a girar. el segundo argumento sera el delay en milisegundos. lo que le digo es que espere un minuto antes de resetear los first y second try y pierdan su clase "girado" boc arriba.
                //reset();
                setTimeout(() => reset(),750);
            }
        }
    }, [firstTry, secondTry]);

    console.log(tazos)

    //resetea el turno
    const reset = () => {
        setFirstTry(null);
        setSecondTry(null);
        setTurns(prevTurns => prevTurns + 1);//track de los giros
        setDesactivado(false);
    }

    //reiniciar el juego de forma automatica cuando se gane
    //llamar a la funcion barajarImagenes. esta funcion es la que comienza el juego
    useEffect(()=>{barajarImagenes},[])



    return (
        <div className="App">
            <h1>Gotta catch them all!</h1>
            <>
            <button onClick={barajarImagenes}>New game</button>
            <h4 className='contador'>Attempts: {turns}</h4>
            </>
            <Game imagenes={tazos} handleTry={handleTry} firstTry={firstTry} secondTry={secondTry}
            desactivado={desactivado} />
            
        </div>
    )
}

export default Memory