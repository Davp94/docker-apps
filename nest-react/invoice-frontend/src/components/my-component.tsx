'use client';
import useUserStore from "@/state-management/state-zustand";

//PROP DRILING
const MyComponent = ({ underline, text }) => {
    const { user, setUser } = useUserStore();
    const greeting = 'hello world - good evening'
    return (
        <>
            {JSON.stringify(user)}
            {/* <p>CONDITIONAL RENDERING</p> */}
            {underline && (<div className="bg-blue-900 flex justi"><strong>{text}</strong></div>)}
        </>
    );
};

export default MyComponent;