import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ isAuth }) {
    const [messages, setMessages] = useState([])
    const [newmessage, setNewmessage] = useState('')

    const SendMessage = async (e) => {
        e.preventDefault()
        if (newmessage !== "") {
            const { uid } = auth.currentUser
            await db.collection('messages').add({ text: newmessage, uid, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
            setNewmessage('')
        }
    }

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return <div>
        {!isAuth &&
            <div className="container">
                <h1 className="display-5">React Chat App</h1>
                <img src={require("../reactchatappimage.jpg")} />
            </div>}
        {isAuth &&
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6 border border-primary">
                        <h3>React Chat App</h3>
                        <ScrollToBottom className="MessageContainer">
                            <div className="Messages">
                                {messages.map(({ id, uid, text }) => {
                                    return (
                                        <div key={id} className={`Message ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                            <h6>{text}</h6>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollToBottom>
                        <br />
                        <form className="row g-3">
                            <div className="col-auto">
                                <input type="text" className="form-control" placeholder="Message" value={newmessage} onChange={(e) => { setNewmessage(e.target.value) }} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-dark" onClick={SendMessage}>Send</button>
                            </div>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        }
    </div>;
}

export default Chat;
