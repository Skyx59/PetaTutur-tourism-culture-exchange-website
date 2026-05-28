/**
 * Peta Tutur - Frontend Logic
 * Strictly Vanilla JS
 */

const FEATURE_ACCESS = {
    crowdsourcing: ['Penyedia Jasa', 'Superadmin'],
    reputation: ['Turis', 'Superadmin'],
    superadmin: ['Superadmin']
};

const PAGE_FEATURE = {
    'crowdsourcing.html': 'crowdsourcing',
    'reputation.html': 'reputation',
    'superadmin.html': 'superadmin'
};

const PROTECTED_PAGES = [
    'dashboard.html',
    'profile.html',
    'catalog.html',
    'workspace.html',
    'history.html',
    'crowdsourcing.html',
    'reputation.html',
    'superadmin.html'
];

document.addEventListener('DOMContentLoaded', () => {
    initAuthModal();
    initSuperadminShortcut();
    initSuperadminGate();
    initLogout();
    initRoleAccess();
    initProfileData();
    initNavActiveState();
    initSuperadminPanel();
    initCrowdsourcingPage();
    initReputationPage();
});

function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('pt_user'));
    } catch {
        localStorage.removeItem('pt_user');
        localStorage.removeItem('userName');
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem('userName', user.name);
    localStorage.setItem('pt_user', JSON.stringify(user));
}

function canAccessFeature(role, feature) {
    return FEATURE_ACCESS[feature]?.includes(role);
}

function buildAuthHeaders() {
    const user = getCurrentUser();
    return {
        'Content-Type': 'application/json',
        'x-user-id': user?.id || '',
        'x-user-role': user?.role || ''
    };
}

async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...buildAuthHeaders(),
            ...(options.headers || {})
        }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan pada server.');
    }
    return data;
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[char]);
}

function formatDate(value) {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

/**
 * Auth Modal Logic (index.html)
 */
function initAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    const openLogin = document.getElementById('openLogin');
    const openRegister = document.getElementById('openRegister');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const nameGroup = document.getElementById('nameGroup');
    const authMode = document.getElementById('authMode');
    
    const tabTuris = document.getElementById('tabTuris');
    const tabPenyedia = document.getElementById('tabPenyedia');
    const agencyGroup = document.getElementById('agencyGroup');
    const userRole = document.getElementById('userRole');

    const switchMode = (mode) => {
        if (mode === 'login') {
            modalTitle.textContent = 'Masuk Ke Akun';
            submitBtn.textContent = 'Masuk Sekarang';
            nameGroup.style.display = 'none';
            authMode.value = 'login';
        } else {
            modalTitle.textContent = 'Daftar Akun';
            submitBtn.textContent = 'Daftar Sekarang';
            nameGroup.style.display = 'flex';
            authMode.value = 'register';
        }
    };

    openLogin?.addEventListener('click', () => {
        switchMode('login');
        modal.showModal();
    });

    openRegister?.addEventListener('click', () => {
        switchMode('register');
        modal.showModal();
    });

    modal.addEventListener('close', () => {
        document.getElementById('authForm')?.reset();
        tabTuris?.click();
    });

    tabTuris?.addEventListener('click', () => {
        tabTuris.classList.add('active');
        tabPenyedia.classList.remove('active');
        agencyGroup.style.display = 'none';
        userRole.value = 'Turis';
    });

    tabPenyedia?.addEventListener('click', () => {
        tabPenyedia.classList.add('active');
        tabTuris.classList.remove('active');
        agencyGroup.style.display = 'flex';
        userRole.value = 'Penyedia Jasa';
    });

    document.getElementById('authForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        const role = userRole.value;
        const specific_data = role === 'Penyedia Jasa'
            ? { agency: document.getElementById('userAgency').value }
            : {};

        const mode = authMode.value;
        const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
        const body = mode === 'register'
            ? { name, email, password, role, specific_data }
            : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (response.ok) {
                if (mode === 'login') {
                    setCurrentUser(result.user);
                    alert('Login Berhasil!');
                    window.location.href = 'dashboard.html';
                } else {
                    alert(result.message);
                    switchMode('login');
                }
            } else {
                alert(result.message || 'Terjadi kesalahan.');
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('Gagal terhubung ke server.');
        }
    });
}

/**
 * Hidden Superadmin Access
 */
function initSuperadminShortcut() {
    if (getCurrentPage() !== 'index.html') return;

    const logo = document.querySelector('.logo');
    if (!logo) return;

    let clicks = 0;
    let resetTimer;
    logo.style.cursor = 'pointer';

    logo.addEventListener('click', () => {
        clicks += 1;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            clicks = 0;
        }, 1200);

        if (clicks >= 5) {
            window.location.href = 'gerbang-tutur.html';
        }
    });
}

function initSuperadminGate() {
    const form = document.getElementById('superadminGateForm');
    if (!form) return;

    const message = document.getElementById('gateMessage');
    const submitBtn = document.getElementById('gateSubmit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        message.textContent = '';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Membuka Gerbang...';

        try {
            const gateKey = document.getElementById('gateKey').value;
            const result = await apiFetch('/api/auth/superadmin-gate', {
                method: 'POST',
                body: JSON.stringify({ gateKey })
            });

            setCurrentUser(result.user);
            window.location.href = 'superadmin.html';
        } catch (error) {
            message.textContent = error.message;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Masuk Superadmin';
        }
    });
}

/**
 * Role Based Navigation and Page Guard
 */
function initRoleAccess() {
    normalizeNavigationLinks();
    const user = getCurrentUser();
    applyRoleVisibility(user);

    const currentPage = getCurrentPage();
    if (!PROTECTED_PAGES.includes(currentPage)) return;

    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    const feature = PAGE_FEATURE[currentPage];
    if (feature && !canAccessFeature(user.role, feature)) {
        alert('Role Anda tidak memiliki akses ke fitur ini.');
        window.location.href = 'dashboard.html';
    }
}

function normalizeNavigationLinks() {
    document.querySelectorAll('.nav-item').forEach(item => {
        const text = item.textContent.trim().toLowerCase();
        if (text === 'cultural catalog') item.setAttribute('href', 'catalog.html');
        if (text === 'crowdsourcing') {
            item.setAttribute('href', 'crowdsourcing.html');
            item.dataset.feature = 'crowdsourcing';
        }
        if (text === 'reputation') {
            item.setAttribute('href', 'reputation.html');
            item.dataset.feature = 'reputation';
        }
    });

    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text === 'create new') link.setAttribute('href', 'workspace.html');
        if (text === 'planning history') link.setAttribute('href', 'history.html');
    });
}

function applyRoleVisibility(user) {
    document.querySelectorAll('[data-feature]').forEach(item => {
        const feature = item.dataset.feature;
        item.style.display = user && canAccessFeature(user.role, feature) ? '' : 'none';
    });

    document.querySelectorAll('[data-feature-card]').forEach(item => {
        const feature = item.dataset.featureCard;
        item.style.display = user && canAccessFeature(user.role, feature) ? '' : 'none';
    });

    const navCenter = document.querySelector('.nav-center');
    if (user?.role === 'Superadmin' && navCenter && !document.getElementById('superadminNavLink')) {
        const link = document.createElement('a');
        link.href = 'superadmin.html';
        link.className = 'nav-item';
        link.id = 'superadminNavLink';
        link.dataset.feature = 'superadmin';
        link.textContent = 'Superadmin';
        navCenter.appendChild(link);
    }
}

/**
 * Profile Population Logic (profile.html)
 */
function initProfileData() {
    const profileName = document.getElementById('profile-name');
    if (!profileName) return;

    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-role').textContent = user.role;
    
    if (user.role === 'Penyedia Jasa' && user.specific_data?.agency) {
        const agencyRow = document.getElementById('agencyRow');
        const profileAgency = document.getElementById('profile-agency');
        if (agencyRow && profileAgency) {
            agencyRow.style.display = 'flex';
            profileAgency.textContent = user.specific_data.agency;
        }
    }
}

/**
 * Logout Logic
 */
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('pt_user');
        localStorage.removeItem('userName');
    });
}

/**
 * Navigation Active State
 */
function initNavActiveState() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else if (item.classList.contains('dropdown')) {
            const subLinks = item.querySelectorAll('.dropdown-menu a');
            subLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * Superadmin Approval Interface
 */
function initSuperadminPanel() {
    const approvalRoot = document.getElementById('approvalRoot');
    if (!approvalRoot) return;

    loadSuperadminPanel();

    approvalRoot.addEventListener('click', async (event) => {
        const actionBtn = event.target.closest('[data-user-action]');
        if (!actionBtn) return;

        const action = actionBtn.dataset.userAction;
        const userId = actionBtn.dataset.userId;
        const endpoint = action === 'approve' ? '/api/admin/approve-user' : '/api/admin/reject-user';

        actionBtn.disabled = true;
        try {
            const result = await apiFetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ user_id: userId })
            });
            alert(result.message);
            await loadSuperadminPanel();
        } catch (error) {
            alert(error.message);
        } finally {
            actionBtn.disabled = false;
        }
    });
}

async function loadSuperadminPanel() {
    try {
        const [stats, users] = await Promise.all([
            apiFetch('/api/admin/stats'),
            apiFetch('/api/admin/pending-users')
        ]);

        setText('pendingPenyediaStat', stats.pendingPenyedia);
        setText('approvedTurisStat', stats.approvedTuris);
        setText('approvedPenyediaStat', stats.approvedPenyedia);
        renderApprovalGroup('pendingPenyediaList', users.filter(user => user.role === 'Penyedia Jasa'), 'Penyedia Jasa');
    } catch (error) {
        const root = document.getElementById('approvalRoot');
        root.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    }
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function renderApprovalGroup(containerId, users, role) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (users.length === 0) {
        container.innerHTML = `<div class="empty-state">Belum ada registrasi ${escapeHtml(role)} yang menunggu.</div>`;
        return;
    }

    container.innerHTML = users.map(user => {
        const agency = user.specific_data?.agency
            ? `<p><strong>Agensi:</strong> ${escapeHtml(user.specific_data.agency)}</p>`
            : '';

        return `
            <article class="approval-card">
                <div class="approval-card-header">
                    <div>
                        <h3>${escapeHtml(user.name)}</h3>
                        <p>${escapeHtml(user.email)}</p>
                    </div>
                    <span class="role-pill">${escapeHtml(user.role)}</span>
                </div>
                <div class="approval-meta">
                    <p><strong>Daftar:</strong> ${formatDate(user.created_at)}</p>
                    ${agency}
                </div>
                <div class="inline-actions">
                    <button class="btn-cta compact" data-user-action="approve" data-user-id="${user.id}">Accept</button>
                    <button class="btn-danger compact" data-user-action="reject" data-user-id="${user.id}">Reject</button>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Crowdsourcing Interface
 */
function initCrowdsourcingPage() {
    const form = document.getElementById('crowdsourcingForm');
    const list = document.getElementById('crowdsourcingList');
    if (!form || !list) return;

    const user = getCurrentUser();
    setText('crowdsourcingUserName', user?.name || '-');
    loadCrowdsourcingItems();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const payload = {
                locationName: document.getElementById('crowdLocation').value,
                description: document.getElementById('crowdDescription').value
            };

            const result = await apiFetch('/api/crowdsourcing', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            alert(result.message);
            form.reset();
            await loadCrowdsourcingItems();
        } catch (error) {
            alert(error.message);
        }
    });

    list.addEventListener('click', async (event) => {
        const button = event.target.closest('[data-crowd-status]');
        if (!button) return;

        try {
            const result = await apiFetch(`/api/crowdsourcing/${button.dataset.crowdId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: button.dataset.crowdStatus })
            });
            alert(result.message);
            await loadCrowdsourcingItems();
        } catch (error) {
            alert(error.message);
        }
    });
}

async function loadCrowdsourcingItems() {
    const list = document.getElementById('crowdsourcingList');
    if (!list) return;

    try {
        const items = await apiFetch('/api/crowdsourcing');
        const user = getCurrentUser();

        if (items.length === 0) {
            list.innerHTML = '<div class="empty-state">Belum ada kontribusi crowdsourcing.</div>';
            return;
        }

        list.innerHTML = items.map(item => {
            const actions = user?.role === 'Superadmin'
                ? `
                    <div class="inline-actions">
                        <button class="btn-cta compact" data-crowd-status="approved" data-crowd-id="${item.id}">Approve</button>
                        <button class="btn-danger compact" data-crowd-status="rejected" data-crowd-id="${item.id}">Reject</button>
                    </div>
                `
                : '';

            return `
                <article class="feature-item-card">
                    <div class="feature-card-topline">
                        <span class="status-badge ${escapeHtml(item.approval_status)}">${escapeHtml(item.approval_status)}</span>
                        <span>${formatDate(item.created_at)}</span>
                    </div>
                    <h3>${escapeHtml(item.location_name)}</h3>
                    <p>${escapeHtml(item.description)}</p>
                    <div class="approval-meta">
                        <p><strong>Kontributor:</strong> ${escapeHtml(item.provider_name || 'Peta Tutur')}</p>
                    </div>
                    ${actions}
                </article>
            `;
        }).join('');
    } catch (error) {
        list.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    }
}

/**
 * Reputation Interface
 */
function initReputationPage() {
    const form = document.getElementById('reputationForm');
    const list = document.getElementById('reputationList');
    if (!form || !list) return;

    loadReputationItems();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const payload = {
                subjectName: document.getElementById('reputationSubject').value,
                subjectType: document.getElementById('reputationType').value,
                rating: document.getElementById('reputationRating').value,
                comment: document.getElementById('reputationComment').value
            };

            const result = await apiFetch('/api/reputation', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            alert(result.message);
            form.reset();
            await loadReputationItems();
        } catch (error) {
            alert(error.message);
        }
    });
}

async function loadReputationItems() {
    const list = document.getElementById('reputationList');
    if (!list) return;

    try {
        const data = await apiFetch('/api/reputation');
        setText('averageRating', data.summary?.average_rating || '0');
        setText('totalReviews', data.summary?.total_reviews || '0');

        if (data.reviews.length === 0) {
            list.innerHTML = '<div class="empty-state">Belum ada ulasan terbaru.</div>';
            return;
        }

        list.innerHTML = data.reviews.map(review => `
            <article class="feature-item-card">
                <div class="feature-card-topline">
                    <span class="role-pill">${escapeHtml(review.subject_type)}</span>
                    <span>Rating ${escapeHtml(review.rating)}/5</span>
                </div>
                <h3>${escapeHtml(review.subject_name)}</h3>
                <p>${escapeHtml(review.comment)}</p>
                <div class="approval-meta">
                    <p><strong>Oleh:</strong> ${escapeHtml(review.tourist_name || 'Turis')}</p>
                    <p><strong>Tanggal:</strong> ${formatDate(review.created_at)}</p>
                </div>
            </article>
        `).join('');
    } catch (error) {
        list.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    }
}

/**
 * Interactive Modal Logic (Catalog & History) - Merged for dynamically loaded elements
 */
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.custom-modal');
        modals.forEach(m => {
            if (e.target === m) m.style.display = 'none';
        });
    });
});
