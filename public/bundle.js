/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleLogin: () => (/* binding */ handleLogin),
/* harmony export */   handleLogout: () => (/* binding */ handleLogout),
/* harmony export */   handleMessage: () => (/* binding */ handleMessage),
/* harmony export */   initializeApp: () => (/* binding */ initializeApp)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _views_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views.js */ "./src/views.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var pollInterval;
function initializeApp() {
  (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
    isLoading: true
  });
  (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.checkSession)().then(function (user) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      username: user.username,
      page: 'chat',
      isLoading: false
    });
    setupPolling();
    refreshView();
  })["catch"](function () {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      page: 'login',
      isLoading: false
    });
    refreshView();
  });
}
function refreshView() {
  var html = (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.render)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
  document.querySelector('#app').innerHTML = html;
}
function handleLogin(event) {
  event.preventDefault();
  var username = event.target.username.value.trim();
  (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
    isLoading: true
  });
  (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.login)(username).then(function (user) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      username: user.username,
      page: 'chat',
      isLoading: false,
      error: null
    });
    setupPolling();
    refreshView();
  })["catch"](function (error) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      error: error.message,
      isLoading: false
    });
    refreshView();
  });
}
function handleMessage(event) {
  event.preventDefault();
  var messageInput = event.target.message;
  var message = messageInput.value.trim();
  (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.sendMessage)(message).then(function () {
    messageInput.value = '';
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)();
  }).then(function (messages) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      messages: messages,
      error: null
    });
    (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.updateMessagesAndUsers)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
  })["catch"](function (error) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      error: error.message
    });
    (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.updateMessagesAndUsers)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
  });
}
function handleLogout() {
  stopPolling();
  (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.logout)().then(function () {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      page: 'login',
      username: null,
      messages: [],
      users: [],
      error: null
    });
    refreshView();
  })["catch"](function (error) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      error: error.message
    });
    refreshView();
  });
}
function setupPolling() {
  stopPolling();
  Promise.all([(0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)(), (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      messages = _ref2[0],
      users = _ref2[1];
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      messages: messages,
      users: users,
      error: null
    });
    (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.updateMessagesAndUsers)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
  })["catch"](function (error) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
      error: error.message
    });
    (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.updateMessagesAndUsers)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
  });
  pollInterval = setInterval(function () {
    Promise.all([(0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)(), (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)()]).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        messages = _ref4[0],
        users = _ref4[1];
      var currentState = (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)();
      if (JSON.stringify(currentState.messages) !== JSON.stringify(messages) || JSON.stringify(currentState.users) !== JSON.stringify(users)) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          messages: messages,
          users: users,
          error: null
        });
        (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.updateMessagesAndUsers)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
      }
    })["catch"](function (error) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
        error: error.message
      });
      (0,_views_js__WEBPACK_IMPORTED_MODULE_1__.updateMessagesAndUsers)((0,_state_js__WEBPACK_IMPORTED_MODULE_0__.getState)());
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
  handleLogin: handleLogin,
  handleMessage: handleMessage,
  handleLogout: handleLogout
};

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkSession: () => (/* binding */ checkSession),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage)
/* harmony export */ });
function checkSession() {
  return fetch('/api/v1/session').then(function (response) {
    if (!response.ok) {
      return Promise.reject(new Error('Not logged in'));
    }
    return response.json();
  });
}
function login(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(new Error(err.error));
      });
    }
    return response.json();
  });
}
function logout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject(new Error('Logout failed'));
    }
  });
}
function fetchMessages() {
  return fetch('/api/v1/messages').then(function (response) {
    if (!response.ok) {
      return Promise.reject(new Error('Failed to fetch messages'));
    }
    return response.json();
  });
}
function sendMessage(text) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text
    })
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(new Error(err.error));
      });
    }
    return response.json();
  });
}
function fetchUsers() {
  return fetch('/api/v1/users').then(function (response) {
    if (!response.ok) {
      return Promise.reject(new Error('Failed to fetch users'));
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearError: () => (/* binding */ clearError),
/* harmony export */   getState: () => (/* binding */ getState),
/* harmony export */   initializeState: () => (/* binding */ initializeState),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   updateState: () => (/* binding */ updateState)
/* harmony export */ });
var state = {
  username: null,
  isLoading: false,
  error: null,
  messages: [],
  users: [],
  page: 'loading'
};
function initializeState() {
  state.username = null;
  state.isLoading = false;
  state.error = null;
  state.messages = [];
  state.users = [];
  state.page = 'loading';
}
function getState() {
  return state;
}
function updateState(updates) {
  Object.assign(state, updates);
}
function setError(error) {
  state.error = error;
  state.isLoading = false;
}
function clearError() {
  state.error = null;
}

/***/ }),

/***/ "./src/views.js":
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   updateMessagesAndUsers: () => (/* binding */ updateMessagesAndUsers)
/* harmony export */ });
function render(state) {
  if (state.isLoading) {
    return "<div class=\"loading\">Loading...</div>";
  }
  if (state.page === 'login') {
    return "\n            <div class=\"login-container\">\n                ".concat(state.error ? "<div class=\"error\">".concat(state.error, "</div>") : '', "\n                <form class=\"login-form\" onsubmit=\"app.handleLogin(event)\">\n                    <input type=\"text\" name=\"username\" placeholder=\"Username\">\n                    <button type=\"submit\" class=\"btn-primary\">Login</button>\n                </form>\n            </div>\n        ");
  }
  if (state.page === 'chat') {
    return "\n            <div class=\"chat-container\">\n                <div class=\"header\">\n                    <h2>Welcome, ".concat(state.username, "</h2>\n                    <button onclick=\"app.handleLogout()\" class=\"btn-logout\">Logout</button>\n                </div>\n                ").concat(state.error ? "<div class=\"error\">".concat(state.error, "</div>") : '', "\n                <div class=\"chat-content\">\n                    <div class=\"users-list\">\n                        <h3>Online Users</h3>\n                        <ul>\n                            ").concat(state.users.map(function (user) {
      return "<li>".concat(user, "</li>");
    }).join(''), "\n                        </ul>\n                    </div>\n                    <div class=\"chat-main\">\n                        <div id=\"messages-container\" class=\"messages-list\">\n                            ").concat(state.messages.map(function (msg) {
      return "\n                                <div class=\"message\">\n                                    <span class=\"username\">".concat(msg.username, "</span>\n                                    <span class=\"text\">").concat(msg.text, "</span>\n                                    <span class=\"timestamp\">").concat(new Date(msg.timestamp).toLocaleTimeString(), "</span>\n                                </div>\n                            ");
    }).join(''), "\n                        </div>\n                        <form id=\"message-form\" class=\"message-form\" onsubmit=\"app.handleMessage(event)\">\n                            <input type=\"text\" name=\"message\" placeholder=\"Type your message...\">\n                            <button type=\"submit\" class=\"btn-primary\">Send</button>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        ");
  }
}
function updateMessagesAndUsers(state) {
  var messagesContainer = document.getElementById('messages-container');
  if (messagesContainer) {
    messagesContainer.innerHTML = state.messages.map(function (msg) {
      return "\n            <div class=\"message\">\n                <span class=\"username\">".concat(msg.username, "</span>\n                <span class=\"text\">").concat(msg.text, "</span>\n                \n            </div>\n        ");
    }).join('');
    var usersList = document.querySelector('.users-list ul');
    if (usersList) {
      usersList.innerHTML = state.users.map(function (user) {
        return "<li>".concat(user, "</li>");
      }).join('');
    }
    var existingError = document.querySelector('.error');
    if (state.error) {
      if (existingError) {
        existingError.textContent = state.error;
      } else {
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = state.error;
        var header = document.querySelector('.header');
        header.insertAdjacentElement('afterend', errorDiv);
      }
    } else if (existingError) {
      existingError.remove();
    }
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkSession: () => (/* reexport safe */ _services_js__WEBPACK_IMPORTED_MODULE_2__.checkSession),
/* harmony export */   fetchMessages: () => (/* reexport safe */ _services_js__WEBPACK_IMPORTED_MODULE_2__.fetchMessages),
/* harmony export */   fetchUsers: () => (/* reexport safe */ _services_js__WEBPACK_IMPORTED_MODULE_2__.fetchUsers),
/* harmony export */   getState: () => (/* reexport safe */ _state_js__WEBPACK_IMPORTED_MODULE_1__.getState),
/* harmony export */   login: () => (/* reexport safe */ _services_js__WEBPACK_IMPORTED_MODULE_2__.login),
/* harmony export */   logout: () => (/* reexport safe */ _services_js__WEBPACK_IMPORTED_MODULE_2__.logout),
/* harmony export */   render: () => (/* reexport safe */ _views_js__WEBPACK_IMPORTED_MODULE_3__.render),
/* harmony export */   sendMessage: () => (/* reexport safe */ _services_js__WEBPACK_IMPORTED_MODULE_2__.sendMessage),
/* harmony export */   updateState: () => (/* reexport safe */ _state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ "./src/app.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _views_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views.js */ "./src/views.js");




(0,_state_js__WEBPACK_IMPORTED_MODULE_1__.initializeState)();
(0,_app_js__WEBPACK_IMPORTED_MODULE_0__.initializeApp)();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map