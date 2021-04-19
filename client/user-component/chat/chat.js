import React, { useState } from "react";
import { ListUserAvailable } from "./chatUtils";
import { User } from "./fakeUser";

export const Chat = () => {

const [online, setOnline] = useState(false);
const [toogleChat, setToogleChat] = useState(true);
const [toogleExpanded, setToogleExpanded] = useState(false)
const toogleChatTo = event => {
    event.preventDefault();
    setToogleChat(!toogleChat)
}
const setUserStatusIcon = () => {
    if (online) {
        return 'online'
    } else {
        return 'offline'
    }
}
const renderAvailableUser = () => {
    return User.map((user, index) => {
        return <ListUserAvailable user={user} key={index}/>
    })
}
const toogleExpandedChat = event => {
    setToogleExpanded(!toogleExpanded)
}
return (
<>
<div className='chat-container'>
    <div className='chat-inner-container'>
        <div className='chat-header'>
            <div className='chat-title'>Chat <span className={`toogle-chat ${toogleChat ? 'show' : 'hide'}`} onClick={toogleChatTo}></span></div>
        </div>
        <div className='chat-body' style={toogleChat ? {} : {height : '0'} }>
            <div className='chat-availabe-user'>
                <ul className='list-users-available'>
                    {renderAvailableUser()}
                </ul>
            </div>
        </div>
    </div>
</div>
<div className='chat-container-selected' style={toogleExpanded ? {} : {display : 'none'} }>
    <div className='chat-inner-container'>
        <div className='chat-header'>
            <div className='chat-title'>User <span className={`toogle-chat-left ${toogleExpanded ? 'show' : 'hide'}`} onClick={toogleExpandedChat}></span></div>
        </div>
        <div className='chat-body'>
            <div className='messages'>
                <ul className='message-list'>
                    <li>Message</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</>
)
}
