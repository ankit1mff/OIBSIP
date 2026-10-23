// Tab Switching Helper
function switchTab(tab) {
    const loginSec = document.getElementById('loginSection');
    const registerSec = document.getElementById('registerSection');
    const loginTab = document.getElementById('loginTabBtn');
    const registerTab = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginSec.classList.remove('hidden');
        registerSec.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginSec.classList.add('hidden');
        registerSec.classList.remove('hidden');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// Simple Client-side SHA-256 Hashing Function to avoid plain text storage
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Registration Logic
document.getElementById('registerBtn').addEventListener('click', async function() {
    const user = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value.trim();
    const errDiv = document.getElementById('regError');
    const successDiv = document.getElementById('regSuccess');

    errDiv.textContent = '';
    successDiv.textContent = '';

    // Form validation: No empty submissions
    if (!user || !pass) {
        errDiv.textContent = 'Please fill in all fields.';
        return;
    }

    // Password validation: Min 8 chars, at least 1 number
    const hasNumber = /\d/;
    if (pass.length < 8 || !hasNumber.test(pass)) {
        errDiv.textContent = 'Password must be at least 8 characters long and contain at least 1 number.';
        return;
    }

    // Fetch existing users from localStorage
    let users = JSON.parse(localStorage.getItem('usersList')) || [];

    // Duplicate check
    const existingUser = users.find(u => u.username === user);
    if (existingUser) {
        errDiv.textContent = 'User already exists with this username/email.';
        return;
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(pass);

    // Save user
    users.push({ username: user, password: hashedPassword });
    localStorage.setItem('usersList', JSON.stringify(users));

    successDiv.textContent = 'Registration successful! You can now login.';
    document.getElementById('regUser').value = '';
    document.getElementById('regPass').value = '';
});

// Login Logic
document.getElementById('loginBtn').addEventListener('click', async function() {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const errDiv = document.getElementById('loginError');

    errDiv.textContent = '';

    // Form validation: No empty submissions
    if (!user || !pass) {
        errDiv.textContent = 'Please fill in all fields.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('usersList')) || [];
    const hashedPassword = await hashPassword(pass);

    // Check credentials (Incorrect credential handling without revealing specific field)
    const validUser = users.find(u => u.username === user && u.password === hashedPassword);

    if (validUser) {
        // Set session in localStorage and redirect to dashboard
        localStorage.setItem('currentUser', user);
        window.location.href = 'dashboard.html';
    } else {
        errDiv.textContent = 'Invalid username or password.';
    }
});