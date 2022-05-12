function Tazo ({imagen, handleTry, gira, desactivado}){
    ///si el tazo esta desactivado no quiero que se ejecute el handletry
    const handleClick = () => {
        //solo si el tazo no est'a desactivado (esta activado), se ejecutara la funion de handle try sobre el tazo// de esta forma se giraran solo los dos que se han elegido y no se aceptara mas de dos giros a la vez
        if (!desactivado){
            handleTry(imagen)
        }
        
    }
//tengo que declarar la funcion fuera del return. si no la declaro y paso la funci'on directemente entro de onClick, no cogera el id unico de cada ficha.
//aplicare la funcion gira a este div si alguna de las tres condiciones se cumple, sino no se aplicara. no se gira.
    return (
        <div className="circuloGame">
        <div className={gira ? "girado" : ""}>
            {/* source dinámico para la cara y no dinámico para el reverso 
            Cuando tenga la clase girado se le aplicar'a a cara.*/}
            <img className="cara" src={imagen.src}  alt="cara tazo" />
            <img className="reverso" src="/img/pokeball.png" onClick={handleClick}  alt="reverso tazo" />
        </div>
        </div>
    )
}
//el clickEvent de reverso actualizara el id del tazo cada vez que se le clique

function Game({desactivado, imagenes, handleTry, firstTry, secondTry, turns}) {
    return (
        <>
            
            <div className="gridGame">
            {imagenes.map(imagen => <Tazo key={imagen.id} imagen={imagen} handleTry={handleTry} 
            gira={imagen===firstTry || imagen===secondTry || imagen.matched} desactivado={desactivado}
            />)}
            
            {/* girar acepta true o false. si es false, se queda boca abajo > reverso. si es true, se queda boca arriba > cara. En gira le paso las tres situaciones en las que se deber'ia girar el tazo*/}
            </div>
            
        </>
    )
}
export default Game