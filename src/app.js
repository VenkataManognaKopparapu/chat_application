import { getState, updateState } from './state.js';
import { render, updateMessagesAndUsers } from './views.js';
import { checkSession, login, logout, sendMessage, fetchMessages, fetchUsers } from './services.js';

let pollInterval;

export function initializeApp() {
    updateState({ isLoading: true });
    
    checkSession()
        .then(user => {
            updateState({ 
                username: user.username,
                page: 'chat',
                isLoading: false 
            });
            setupPolling();
            refreshView();
        })
        .catch(() => {
            updateState({ 
                page: 'login',
                isLoading: false 
            });
            refreshView();
        });
}

function refreshView() {
    const html = render(getState());
    document.querySelector('#app').innerHTML = html;
}

export function handleLogin(event) {
    event.preventDefault();
    const username = event.target.username.value.trim();
    
    updateState({ isLoading: true });
    login(username)
        .then(user => {
            updateState({ 
                username: user.username,
                page: 'chat',
                isLoading: false,
                error: null
            });
            setupPolling();
            refreshView();
        })
        .catch(error => {
            updateState({ 
                error: error.message,
                isLoading: false 
            });
            refreshView();
        });
}

export function handleMessage(event) {
    event.preventDefault();
    const messageInput = event.target.message;
    const message = messageInput.value.trim();
    
    sendMessage(message)
        .then(() => {
            messageInput.value = '';
            return fetchMessages();
        })
        .then(messages => {
            updateState({ messages, error: null });
            updateMessagesAndUsers(getState());
        })
        .catch(error => {
            updateState({ error: error.message });
            updateMessagesAndUsers(getState());
        });
}

export function handleLogout() {
    stopPolling();
    logout()
        .then(() => {
            updateState({
                page: 'login',
                username: null,
                messages: [],
                users: [],
                error: null
            });
            refreshView();
        })
        .catch(error => {
            updateState({ error: error.message });
            refreshView();
        });
}

function setupPolling() {
    stopPolling();
    
    Promise.all([fetchMessages(), fetchUsers()])
        .then(([messages, users]) => {
            updateState({ messages, users, error: null });
            updateMessagesAndUsers(getState());
        })
        .catch(error => {
            updateState({ error: error.message });
            updateMessagesAndUsers(getState());
        });

    pollInterval = setInterval(() => {
        Promise.all([fetchMessages(), fetchUsers()])
            .then(([messages, users]) => {
                const currentState = getState();
                if (JSON.stringify(currentState.messages) !== JSON.stringify(messages) ||
                    JSON.stringify(currentState.users) !== JSON.stringify(users)) {
                    updateState({ messages, users, error: null });
                    updateMessagesAndUsers(getState());
                }
            })
            .catch(error => {
                updateState({ error: error.message });
                updateMessagesAndUsers(getState());
            });
    }, 5000);
}

function stopPolling() {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
}

window.app = {
    handleLogin,
    handleMessage,
    handleLogout
};