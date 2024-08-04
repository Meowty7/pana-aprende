import {useEffect, useRef, useState} from 'react';

const RouletteWheel = ({options, onNumberSelected}) => {

    const canvasRef = useRef(null);
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {

        let startAngle = 0;
        const arc = Math.PI / (options.length / 2);
        let spinTimeout = null;

        let spinTime = 0;
        let spinTimeTotal = 0;
        let ctx;

        function byte2Hex(n) {
            const nybHexString = "0123456789ABCDEF";
            return (
                String(nybHexString.substr(n >> 4 & 0x0f, 1)) +
                nybHexString.substr(n & 0x0f, 1)
            );
        }

        function RGB2Color(r, g, b) {
            return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
        }

        function getColor(item, maxitem) {
            const phase = 0;
            const center = 128;
            const width = 127;
            const frequency = Math.PI * 2 / maxitem;

            const red = Math.sin(frequency * item + 2 + phase) * width + center;
            const green = Math.sin(frequency * item + phase) * width + center;
            const blue = Math.sin(frequency * item + 4 + phase) * width + center;

            return RGB2Color(red, green, blue);
        }

        function drawRouvarteWheel() {
            const canvas = canvasRef.current;
            if (canvas && canvas.getContext) {
                const outsideRadius = 200;
                const textRadius = 160;
                const insideRadius = 125;

                ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, 500, 500);

                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;

                ctx.font = 'bold 12px Helvetica, Arial';

                for (let i = 0; i < options.length; i++) {
                    const angle = startAngle + i * arc;
                    ctx.fillStyle = getColor(i, options.length);

                    ctx.beginPath();
                    ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
                    ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();

                    ctx.save();
                    ctx.shadowOffsetX = -1;
                    ctx.shadowOffsetY = -1;
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = "rgb(220,220,220)";
                    ctx.fillStyle = "black";
                    ctx.translate(
                        250 + Math.cos(angle + arc / 2) * textRadius,
                        250 + Math.sin(angle + arc / 2) * textRadius
                    );

                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    const text = options[i];
                    ctx.font = 'bold 2rem Roboto, Arial';
                    ctx.fillText(text, -ctx.measureText(text).width / 5, 10);
                    ctx.restore();
                }

                // Arrow
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
                ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
                ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
                ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
                ctx.lineTo(250, 250 - (outsideRadius - 13));
                ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
                ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
                ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
                ctx.fill();
            }
        }

        let spinAngleStart;

        function rotateWheel() {
            spinTime += 30;
            if (spinTime >= spinTimeTotal) {
                stopRotateWheel();
                return;
            }
            const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
            startAngle += spinAngle * Math.PI / 180;
            drawRouvarteWheel();
            spinTimeout = setTimeout(rotateWheel, 30); // Pass a reference to the function
        }

        function spin() {
            spinAngleStart = Math.random() * 10 + 10;
            spinTime = 0;
            spinTimeTotal = Math.random() * 3 + 4 * 1000;
            drawRouvarteWheel(); // Redraw the wheel before starting to spin
            rotateWheel();
        }

        drawRouvarteWheel()
        
        if(spinning){
            spin()
            setSpinning(false)
        }

        function stopRotateWheel() {
            clearTimeout(spinTimeout);
            const degrees = startAngle * 180 / Math.PI + 90;
            const arcd = arc * 180 / Math.PI;
            const index = Math.floor((360 - degrees % 360) / arcd);
            ctx.save();
            ctx.font = "bold 4rem Helvetica, Arial";
            ctx.fillStyle = "white";
            const text = options[index];
            onNumberSelected(text)
            ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
            ctx.restore();
        }

        function easeOut(t, b, c, d) {
            const ts = (t /= d) * t;
            const tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        }
    }, [spinning]);

    function handleClick (){
        setSpinning(true)
    }

    return (
        <>
            <div className=" flex flex-col \">
                <button onClick={handleClick} className="bg-blue-500 font-mono rounded p-2 mb-4">
                    GIRA LA RULETA
                </button>
                <canvas ref={canvasRef} width="500" height="500"></canvas>
            </div>
        </>
    );

};

export default RouletteWheel;