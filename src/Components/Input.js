import React from "react";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';



export default function Input({onSendMessage}) {
const [text, setText] = useState('');

const changeText =(e)=>{
    const chatText = e.target.value;
    setText(chatText.trimStart());
}

const handleSubmit =(e)=>{
    e.preventDefault(); // must as we have no server
    onSendMessage(text);
    setText('');
}

return (
    <div>
        <form onSubmit={handleSubmit} className="input">
            <input 
            className='inputChat'
            onChange={changeText}
            value={text}
            type='text'
            placeholder='"Lets chat"'
            autoFocus={true}
            >
            </input>
            <button type="submit" className="inputBtn" onSubmit={handleSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>
    </div>
);
}