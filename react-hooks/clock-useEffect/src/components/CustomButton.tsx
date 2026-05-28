const CustomButton = (props: {
    text: string,
    fn:(e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
    const { text , fn } = props
    return (
        <button
        onClick={fn}
        
        style={{
            height:"50px",
            width:"100px"
        }}
        >
            {text}
        </button>
    )
}

export default CustomButton