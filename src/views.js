

export function render(state) {
    if (state.isLoading) {
        return `<div class="loading">Loading...</div>`;
    }

    if (state.page === 'login') {
        return `
            <div class="login-container">
                ${state.error ? `<div class="error">${state.error}</div>` : ''}
                <form class="login-form" onsubmit="app.handleLogin(event)">
                    <input type="text" name="username" placeholder="Username">
                    <button type="submit" class="btn-primary">Login</button>
                </form>
            </div>
        `;
    }

    if (state.page === 'chat') {
        return `
            <div class="chat-container">
                <div class="header">
                    <h2>Welcome, ${state.username}</h2>
                    <button onclick="app.handleLogout()" class="btn-logout">Logout</button>
                </div>
                ${state.error ? `<div class="error">${state.error}</div>` : ''}
                <div class="chat-content">
                    <div class="users-list">
                        <h3>Online Users</h3>
                        <ul>
                            ${state.users.map(user => `<li>${user}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="chat-main">
                        <div id="messages-container" class="messages-list">
                            ${state.messages.map(msg => `
                                <div class="message">
                                    <span class="username">${msg.username}</span>
                                    <span class="text">${msg.text}</span>
                                    <span class="timestamp">${new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            `).join('')}
                        </div>
                        <form id="message-form" class="message-form" onsubmit="app.handleMessage(event)">
                            <input type="text" name="message" placeholder="Type your message...">
                            <button type="submit" class="btn-primary">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

export function updateMessagesAndUsers(state) {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
        messagesContainer.innerHTML = state.messages.map(msg => `
            <div class="message">
                <span class="username">${msg.username}</span>
                <span class="text">${msg.text}</span>
                
            </div>
        `).join('');

        const usersList = document.querySelector('.users-list ul');
        if (usersList) {
            usersList.innerHTML = state.users.map(user => `<li>${user}</li>`).join('');
        }

        
        const existingError = document.querySelector('.error');
        if (state.error) {
            if (existingError) {
                existingError.textContent = state.error;
            } else {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error';
                errorDiv.textContent = state.error;
                const header = document.querySelector('.header');
                header.insertAdjacentElement('afterend', errorDiv);
            }
        } else if (existingError) {
            existingError.remove();
        }

        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}