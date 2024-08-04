import { useEffect, useState } from 'react';
import '/src/styles/welcome.popup.css';

export default function WelcomePopup({username}: {username: string}) {
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => setShow(false), 300); // Espera el tiempo del desvanecimiento antes de ocultar
            }, 60000); // El popup se mostrará durante 5 segundos
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div className={`popup ${fadeOut ? 'fade-out' : ''}`}>
            <div className="popup-content">
                <button onClick={() => {
                    setFadeOut(true);
                    setTimeout(() => setShow(false), 300); // Espera el tiempo del desvanecimiento antes de ocultar
                }} className="close">
                    Cerrar
                </button>
                <p>
                    <strong>Bienvenido a PanaAprende <span className="text-red-500">{username}</span>!</strong> <br/>
                    Explora la historia de Panamá y descubre cómo su
                    pasado ha moldeado su presente. <br/>
                    En este juego educativo podrás:<br/><br/>

                    <strong>Explorar la Evolución de Panamá:</strong> Conoce los eventos y procesos
                    históricos que han definido su desarrollo político, social y económico.<br/><br/>

                    <strong>Reconocer a los Héroes Nacionales:</strong> Aprende sobre el legado de los héroes
                    que han dejado su marca en la cultura y sociedad.<br/><br/>

                    <strong>Analizar Conflictos y Resoluciones:</strong> Comprende las causas y efectos de
                    los conflictos en la estabilidad del país y el papel de los líderes en la construcción de la
                    paz.<br/><br/>

                    <strong>Descubrir la Historia del Canal:</strong> Lista los eventos claves detrás de la
                    construcción y transferencia del Canal de Panamá.<br/><br/>

                    <p className="font-bold">
                        Responde preguntas, recibe retroalimentación inmediata y refuerza tu conocimiento de una
                        manera divertida y educativa.
                    </p>
                </p>
            </div>
        </div>
    );
}
