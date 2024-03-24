// SharedContext.js
import React, { createContext, useContext, useState } from 'react';

const SharedContext = createContext();

export const useSharedContext = () => useContext(SharedContext);

export const SharedDataSet = ({ children }) => {
    const [emailValue, setEmailValue] = useState(localStorage.getItem('email') === 'true' || false); // Replace 'example' with your initial value
    const [notificationValue, setNotificationValue] = useState(localStorage.getItem('notification') === 'true' || false); // Replace 'example' with your initial value

    const updateEmailValue = (newValue) => {
        setEmailValue(newValue);
        localStorage.setItem('email', newValue);
    };
    const updateNotificationValue = (newValue) => {
        setNotificationValue(newValue);
        localStorage.setItem('notification', newValue);
    };
    return (
        <SharedContext.Provider value={{ emailValue, updateEmailValue , notificationValue, updateNotificationValue }}>
            {children}
        </SharedContext.Provider>
    );
};
