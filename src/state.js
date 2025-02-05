
const state = {
    username: null,
    isLoading: false,
    error: null,
    messages: [],
    users: [],
    page: 'loading', 
};

export function initializeState() {
    state.username = null;
    state.isLoading = false;
    state.error = null;
    state.messages = [];
    state.users = [];
    state.page = 'loading';
}

export function getState() {
    return state;
}

export function updateState(updates) {
    Object.assign(state, updates);
}

export function setError(error) {
    state.error = error;
    state.isLoading = false;
}

export function clearError() {
    state.error = null;
}
