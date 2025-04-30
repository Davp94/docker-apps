const MyComponent = ({ underline }) => {
    const greeting = 'hello world - good evening'
    return (
        <>
            {underline && (<div><strong>{greeting}</strong></div>)}
        </>
    );
};

export default MyComponent;