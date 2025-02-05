
export function checkSession() {
    return fetch('/api/v1/session')
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Not logged in'));
            }
            return response.json();
        });
}

export function login(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(new Error(err.error)));
        }
        return response.json();
    });
}

export function logout() {
    return fetch('/api/v1/session', {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject(new Error('Logout failed'));
        }
    });
}

export function fetchMessages() {
    return fetch('/api/v1/messages')
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Failed to fetch messages'));
            }
            return response.json();
        });
}

export function sendMessage(text) {
    return fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(new Error(err.error)));
        }
        return response.json();
    });
}

export function fetchUsers() {
    return fetch('/api/v1/users')
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Failed to fetch users'));
            }
            return response.json();
        });
}
