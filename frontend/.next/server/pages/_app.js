/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/Footer.js":
/*!******************************!*\
  !*** ./components/Footer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Footer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Footer() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n        style: {\n            textAlign: \"center\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n            children: [\n                \"\\xa9 \",\n                new Date().getFullYear(),\n                \" Rodel Advan — All rights reserved.\"\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Footer.js\",\n            lineNumber: 4,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Footer.js\",\n        lineNumber: 3,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0Zvb3Rlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWUsU0FBU0E7SUFDdEIscUJBQ0UsOERBQUNDO1FBQU9DLE9BQU87WUFBRUMsV0FBVztRQUFTO2tCQUNuQyw0RUFBQ0M7O2dCQUFFO2dCQUFRLElBQUlDLE9BQU9DLFdBQVc7Z0JBQUc7Ozs7Ozs7Ozs7OztBQUcxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5jeS1mcm9udGVuZC8uL2NvbXBvbmVudHMvRm9vdGVyLmpzP2UxYWIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKCkge1xuICByZXR1cm4gKFxuICAgIDxmb290ZXIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgIDxwPiZjb3B5OyB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBSb2RlbCBBZHZhbiDigJQgQWxsIHJpZ2h0cyByZXNlcnZlZC48L3A+XG4gICAgPC9mb290ZXI+XG4gICk7XG59Il0sIm5hbWVzIjpbIkZvb3RlciIsImZvb3RlciIsInN0eWxlIiwidGV4dEFsaWduIiwicCIsIkRhdGUiLCJnZXRGdWxsWWVhciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Footer.js\n");

/***/ }),

/***/ "./components/Navbar.js":
/*!******************************!*\
  !*** ./components/Navbar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navbar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction Navbar() {\n    const [loggedIn, setLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        // Check login status from localStorage or cookie (simple demo)\n        const checkLogin = ()=>setLoggedIn(!!localStorage.getItem(\"advanistic_logged_in\"));\n        checkLogin();\n        window.addEventListener(\"storage\", checkLogin);\n        return ()=>window.removeEventListener(\"storage\", checkLogin);\n    }, []);\n    const handleLogout = ()=>{\n        localStorage.removeItem(\"advanistic_logged_in\");\n        setLoggedIn(false);\n        router.push(\"/\");\n    };\n    // Listen for login event and redirect to home\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const handleLogin = (e)=>{\n            if (e.key === \"advanistic_logged_in\" && e.newValue) {\n                setLoggedIn(true);\n                router.push(\"/\");\n            }\n        };\n        window.addEventListener(\"storage\", handleLogin);\n        return ()=>window.removeEventListener(\"storage\", handleLogin);\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container\",\n            style: {\n                display: \"flex\",\n                justifyContent: \"space-between\",\n                alignItems: \"center\"\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    style: {\n                        margin: 0,\n                        style: {\n                            color: \"#ffffff\"\n                        }\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/\",\n                        children: \"Advanistic\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                        lineNumber: 38,\n                        columnNumber: 64\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: \"/\",\n                                    children: \"Home\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                    lineNumber: 41,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                lineNumber: 41,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: \"/services\",\n                                    children: \"Services\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                    lineNumber: 42,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                lineNumber: 42,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: \"/blog\",\n                                    children: \"Blog\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                    lineNumber: 45,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                lineNumber: 45,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: \"/releases\",\n                                    children: \"Releases\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                    lineNumber: 46,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                lineNumber: 46,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                children: loggedIn ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: handleLogout,\n                                    style: {\n                                        cursor: \"pointer\",\n                                        color: \"#fff\",\n                                        backgroundColor: \"#d32f2f\",\n                                        fontWeight: 700\n                                    },\n                                    children: \"Logout\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                    lineNumber: 49,\n                                    columnNumber: 17\n                                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: \"/login\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        style: {\n                                            cursor: \"pointer\",\n                                            color: \"#fff\",\n                                            backgroundColor: \"#00af66\",\n                                            fontWeight: 700\n                                        },\n                                        children: \"Login\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                        lineNumber: 57,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                    lineNumber: 56,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                                lineNumber: 47,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                        lineNumber: 40,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n                    lineNumber: 39,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n            lineNumber: 37,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\components\\\\Navbar.js\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdmJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTZCO0FBQ2U7QUFDSjtBQUV6QixTQUFTSTtJQUN0QixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR0wsK0NBQVFBLENBQUM7SUFDekMsTUFBTU0sU0FBU0osc0RBQVNBO0lBRXhCRCxnREFBU0EsQ0FBQztRQUNSLCtEQUErRDtRQUMvRCxNQUFNTSxhQUFhLElBQU1GLFlBQVksQ0FBQyxDQUFDRyxhQUFhQyxPQUFPLENBQUM7UUFDNURGO1FBQ0FHLE9BQU9DLGdCQUFnQixDQUFDLFdBQVdKO1FBQ25DLE9BQU8sSUFBTUcsT0FBT0UsbUJBQW1CLENBQUMsV0FBV0w7SUFDckQsR0FBRyxFQUFFO0lBRUwsTUFBTU0sZUFBZTtRQUNuQkwsYUFBYU0sVUFBVSxDQUFDO1FBQ3hCVCxZQUFZO1FBQ1pDLE9BQU9TLElBQUksQ0FBQztJQUNkO0lBRUEsOENBQThDO0lBQzlDZCxnREFBU0EsQ0FBQztRQUNSLE1BQU1lLGNBQWMsQ0FBQ0M7WUFDbkIsSUFBSUEsRUFBRUMsR0FBRyxLQUFLLDBCQUEwQkQsRUFBRUUsUUFBUSxFQUFFO2dCQUNsRGQsWUFBWTtnQkFDWkMsT0FBT1MsSUFBSSxDQUFDO1lBQ2Q7UUFDRjtRQUNBTCxPQUFPQyxnQkFBZ0IsQ0FBQyxXQUFXSztRQUNuQyxPQUFPLElBQU1OLE9BQU9FLG1CQUFtQixDQUFDLFdBQVdJO0lBQ3JELEdBQUc7UUFBQ1Y7S0FBTztJQUVYLHFCQUNFLDhEQUFDYztrQkFDQyw0RUFBQ0M7WUFBSUMsV0FBVTtZQUFZQyxPQUFPO2dCQUFFQyxTQUFTO2dCQUFRQyxnQkFBZ0I7Z0JBQWlCQyxZQUFZO1lBQVM7OzhCQUN6Ryw4REFBQ0M7b0JBQUdKLE9BQU87d0JBQUVLLFFBQVE7d0JBQUdMLE9BQU87NEJBQUVNLE9BQU87d0JBQVU7b0JBQUU7OEJBQUcsNEVBQUM5QixrREFBSUE7d0JBQUMrQixNQUFLO2tDQUFJOzs7Ozs7Ozs7Ozs4QkFDdEUsOERBQUNDOzhCQUNDLDRFQUFDQzs7MENBQ0MsOERBQUNDOzBDQUFHLDRFQUFDbEMsa0RBQUlBO29DQUFDK0IsTUFBSzs4Q0FBSTs7Ozs7Ozs7Ozs7MENBQ25CLDhEQUFDRzswQ0FBRyw0RUFBQ2xDLGtEQUFJQTtvQ0FBQytCLE1BQUs7OENBQVk7Ozs7Ozs7Ozs7OzBDQUczQiw4REFBQ0c7MENBQUcsNEVBQUNsQyxrREFBSUE7b0NBQUMrQixNQUFLOzhDQUFROzs7Ozs7Ozs7OzswQ0FDdkIsOERBQUNHOzBDQUFHLDRFQUFDbEMsa0RBQUlBO29DQUFDK0IsTUFBSzs4Q0FBWTs7Ozs7Ozs7Ozs7MENBQzNCLDhEQUFDRzswQ0FDRTdCLHlCQUNDLDhEQUFDOEI7b0NBQ0NDLFNBQVN0QjtvQ0FDVFUsT0FBTzt3Q0FBRWEsUUFBUTt3Q0FBV1AsT0FBTzt3Q0FBUVEsaUJBQWlCO3dDQUFXQyxZQUFZO29DQUFJOzhDQUN4Rjs7Ozs7eURBSUQsOERBQUN2QyxrREFBSUE7b0NBQUMrQixNQUFLOzhDQUNULDRFQUFDSTt3Q0FBT1gsT0FBTzs0Q0FBRWEsUUFBUTs0Q0FBV1AsT0FBTzs0Q0FBUVEsaUJBQWlCOzRDQUFXQyxZQUFZO3dDQUFJO2tEQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdwSCIsInNvdXJjZXMiOlsid2VicGFjazovL2FnZW5jeS1mcm9udGVuZC8uL2NvbXBvbmVudHMvTmF2YmFyLmpzP2ZiY2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdmJhcigpIHtcbiAgY29uc3QgW2xvZ2dlZEluLCBzZXRMb2dnZWRJbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gQ2hlY2sgbG9naW4gc3RhdHVzIGZyb20gbG9jYWxTdG9yYWdlIG9yIGNvb2tpZSAoc2ltcGxlIGRlbW8pXG4gICAgY29uc3QgY2hlY2tMb2dpbiA9ICgpID0+IHNldExvZ2dlZEluKCEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FkdmFuaXN0aWNfbG9nZ2VkX2luJykpO1xuICAgIGNoZWNrTG9naW4oKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGNoZWNrTG9naW4pO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGNoZWNrTG9naW4pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhZHZhbmlzdGljX2xvZ2dlZF9pbicpO1xuICAgIHNldExvZ2dlZEluKGZhbHNlKTtcbiAgICByb3V0ZXIucHVzaCgnLycpO1xuICB9O1xuXG4gIC8vIExpc3RlbiBmb3IgbG9naW4gZXZlbnQgYW5kIHJlZGlyZWN0IHRvIGhvbWVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVMb2dpbiA9IChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdhZHZhbmlzdGljX2xvZ2dlZF9pbicgJiYgZS5uZXdWYWx1ZSkge1xuICAgICAgICBzZXRMb2dnZWRJbih0cnVlKTtcbiAgICAgICAgcm91dGVyLnB1c2goJy8nKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgaGFuZGxlTG9naW4pO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGhhbmRsZUxvZ2luKTtcbiAgfSwgW3JvdXRlcl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlcj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgPGgxIHN0eWxlPXt7IG1hcmdpbjogMCwgc3R5bGU6IHsgY29sb3I6ICcjZmZmZmZmJyB9IH19PjxMaW5rIGhyZWY9XCIvXCI+QWR2YW5pc3RpYzwvTGluaz48L2gxPlxuICAgICAgICA8bmF2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaT48TGluayBocmVmPVwiL1wiPkhvbWU8L0xpbms+PC9saT5cbiAgICAgICAgICAgIDxsaT48TGluayBocmVmPVwiL3NlcnZpY2VzXCI+U2VydmljZXM8L0xpbms+PC9saT5cbiAgICAgICAgICAgIHsvKiA8bGk+PExpbmsgaHJlZj1cIi9jb3Vyc2VzXCI+Q291cnNlczwvTGluaz48L2xpPiAqL31cbiAgICAgICAgICAgIHsvKiA8bGk+PExpbmsgaHJlZj1cIi9zdG9yZVwiPlN0b3JlPC9MaW5rPjwvbGk+ICovfVxuICAgICAgICAgICAgPGxpPjxMaW5rIGhyZWY9XCIvYmxvZ1wiPkJsb2c8L0xpbms+PC9saT5cbiAgICAgICAgICAgIDxsaT48TGluayBocmVmPVwiL3JlbGVhc2VzXCI+UmVsZWFzZXM8L0xpbms+PC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAge2xvZ2dlZEluID8gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogJyNmZmYnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZDMyZjJmJywgZm9udFdlaWdodDogNzAwIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgTG9nb3V0XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6ICcjZmZmJywgYmFja2dyb3VuZENvbG9yOiAnIzAwYWY2NicsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgTG9naW5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJMaW5rIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJOYXZiYXIiLCJsb2dnZWRJbiIsInNldExvZ2dlZEluIiwicm91dGVyIiwiY2hlY2tMb2dpbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZUxvZ291dCIsInJlbW92ZUl0ZW0iLCJwdXNoIiwiaGFuZGxlTG9naW4iLCJlIiwia2V5IiwibmV3VmFsdWUiLCJoZWFkZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJzdHlsZSIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJoMSIsIm1hcmdpbiIsImNvbG9yIiwiaHJlZiIsIm5hdiIsInVsIiwibGkiLCJidXR0b24iLCJvbkNsaWNrIiwiY3Vyc29yIiwiYmFja2dyb3VuZENvbG9yIiwiZm9udFdlaWdodCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Navbar.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Footer */ \"./components/Footer.js\");\n\n\n\n\n\n// Client-only providers (wrap interactive parts)\nconst ClientProviders = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(()=>__webpack_require__.e(/*! import() */ \"components_ClientProviders_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../components/ClientProviders */ \"./components/ClientProviders.js\")), {\n    loadableGenerated: {\n        modules: [\n            \"pages\\\\_app.js -> \" + \"../components/ClientProviders\"\n        ]\n    },\n    ssr: false\n});\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ClientProviders, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                style: {\n                    minHeight: \"80vh\"\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\pages\\\\_app.js\",\n                    lineNumber: 14,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\BRACU Course Stuff\\\\Semester 10\\\\CSE391\\\\Project\\\\agency_clique_app\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDSTtBQUNPO0FBQ0E7QUFFMUMsaURBQWlEO0FBQ2pELE1BQU1HLGtCQUFrQkgsbURBQU9BLENBQUMsSUFBTSxrTUFBTzs7Ozs7O0lBQW9DSSxLQUFLOztBQUV2RSxTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3BELHFCQUNFLDhEQUFDSjs7MEJBQ0MsOERBQUNGLDBEQUFNQTs7Ozs7MEJBQ1AsOERBQUNPO2dCQUFLQyxPQUFPO29CQUFFQyxXQUFXO2dCQUFPOzBCQUMvQiw0RUFBQ0o7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7MEJBRTFCLDhEQUFDTCwwREFBTUE7Ozs7Ozs7Ozs7O0FBR2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ2VuY3ktZnJvbnRlbmQvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0IGR5bmFtaWMgZnJvbSAnbmV4dC9keW5hbWljJztcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9OYXZiYXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlcic7XG5cbi8vIENsaWVudC1vbmx5IHByb3ZpZGVycyAod3JhcCBpbnRlcmFjdGl2ZSBwYXJ0cylcbmNvbnN0IENsaWVudFByb3ZpZGVycyA9IGR5bmFtaWMoKCkgPT4gaW1wb3J0KCcuLi9jb21wb25lbnRzL0NsaWVudFByb3ZpZGVycycpLCB7IHNzcjogZmFsc2UgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxDbGllbnRQcm92aWRlcnM+XG4gICAgICA8TmF2YmFyIC8+XG4gICAgICA8bWFpbiBzdHlsZT17eyBtaW5IZWlnaHQ6ICc4MHZoJyB9fT5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9tYWluPlxuICAgICAgPEZvb3RlciAvPlxuICAgIDwvQ2xpZW50UHJvdmlkZXJzPlxuICApO1xufSJdLCJuYW1lcyI6WyJkeW5hbWljIiwiTmF2YmFyIiwiRm9vdGVyIiwiQ2xpZW50UHJvdmlkZXJzIiwic3NyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJtYWluIiwic3R5bGUiLCJtaW5IZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@apollo/client");;

/***/ }),

/***/ "@apollo/client/react":
/*!***************************************!*\
  !*** external "@apollo/client/react" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@apollo/client/react");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();