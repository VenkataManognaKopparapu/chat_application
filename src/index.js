
import { initializeApp } from './app.js';
import { getState, updateState, initializeState } from './state.js';
import { checkSession, login, logout, sendMessage, fetchMessages, fetchUsers } from './services.js';
import { render } from './views.js';


initializeState();
initializeApp();


export {
    getState,
    updateState,
    render,
    checkSession,
    login,
    logout,
    sendMessage,
    fetchMessages,
    fetchUsers
};