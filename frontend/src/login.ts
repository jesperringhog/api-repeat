import './styles/style.scss'
import { initLogin } from './utils/loginUtil';

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    initLogin();
})