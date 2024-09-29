import React from 'react';

const GreetComponent: React.FC = () => {
    //obtengo el saludo
    const getGreeting = (): string =>{
        const hour = new Date().getHours();
    
    //bloque if par el msnjae a mostrar
    if (hour < 12){
        return 'Buenos días! ';
    }else if (hour < 18 ){
        return 'Buenas tardes! ';
    }else{
        return 'Buenas noches! ';
    }
};
    return (
        <div>
            <h1>{getGreeting()}</h1>
        </div>
    );
};

export default GreetComponent;