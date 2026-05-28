import { useEffect, useState } from "react"
import CustomButton from "./CustomButton";


const Clock = () => {
    const [buttonState , setButtonState] = useState(true)

    const getFormattedTime = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const [currentTime, setCurrentTime] = useState(getFormattedTime())

    useEffect(() => {
        if(!buttonState) return
        const id = setInterval(() => {
            setCurrentTime(getFormattedTime())
            console.log("hello")
        }, 1000);

        return ()=>{
            clearInterval(id)
        }
    }, [buttonState])

    const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setButtonState(prev => !prev)
    }

    return (
        <div>
            <h1>
                {buttonState && currentTime}
            </h1>
            <CustomButton text={buttonState ? "Hide" : "Show"} fn={handleButtonClick}/>
        </div>
    )
}

export default Clock