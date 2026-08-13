// ============================================
// WAIT FOR DOM TO LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    // Sample data for search
    const searchData = {
        farmers: [
            { id: 1, name: 'Ramesh Kumar', village: 'Village A', phone: '9876543210', crop: 'Wheat' },
            { id: 2, name: 'Sita Devi', village: 'Village B', phone: '9876543211', crop: 'Rice' },
            { id: 3, name: 'Amit Sharma', village: 'Village C', phone: '9876543212', crop: 'Vegetables' },
            { id: 4, name: 'Priya Patel', village: 'Village D', phone: '9876543213', crop: 'Onions' },
            { id: 5, name: 'Gopal Singh', village: 'Village E', phone: '9876543214', crop: 'Pulses' },
            { id: 6, name: 'Meena Devi', village: 'Village F', phone: '9876543215', crop: 'Mangoes' },
            { id: 7, name: 'Rajesh Kumar', village: 'Village G', phone: '9876543216', crop: 'Potatoes' }
        ],
        produce: [
            { id: 1, name: 'Wheat', grade: 'A', quantity: '1200 kg', batch: 'BATCH-001' },
            { id: 2, name: 'Rice', grade: 'Premium', quantity: '850 kg', batch: 'BATCH-002' },
            { id: 3, name: 'Tomatoes', grade: 'Fresh', quantity: '420 kg', batch: 'BATCH-003' },
            { id: 4, name: 'Onions', grade: 'A', quantity: '350 kg', batch: 'BATCH-004' },
            { id: 5, name: 'Pulses', grade: 'Premium', quantity: '280 kg', batch: 'BATCH-005' }
        ],
        orders: [
            { id: 'ORD-1024', buyer: 'Mumbai Mart', item: 'Basmati Rice', qty: '200 kg', status: 'Delivered' },
            { id: 'ORD-1025', buyer: 'Pune Store', item: 'Wheat', qty: '500 kg', status: 'Processing' },
            { id: 'ORD-1026', buyer: 'Delhi Bazaar', item: 'Tomatoes', qty: '150 kg', status: 'Shipped' },
            { id: 'ORD-1027', buyer: 'Chennai Supermarket', item: 'Rice', qty: '300 kg', status: 'Pending' }
        ],
        payments: [
            { id: 'PAY-001', farmer: 'Ramesh Kumar', amount: '₹28,000', status: 'Paid' },
            { id: 'PAY-002', farmer: 'Sita Devi', amount: '₹22,500', status: 'Paid' },
            { id: 'PAY-003', farmer: 'Amit Sharma', amount: '₹35,200', status: 'Pending' },
            { id: 'PAY-004', farmer: 'Priya Patel', amount: '₹12,000', status: 'Paid' }
        ],
        inventory: [
            { id: 1, name: 'Wheat', location: 'Warehouse A', batch: 'BATCH-001', expiry: '2026-12-31' },
            { id: 2, name: 'Rice', location: 'Warehouse B', batch: 'BATCH-002', expiry: '2026-11-15' },
            { id: 3, name: 'Tomatoes', location: 'Warehouse A', batch: 'BATCH-003', expiry: '2026-10-01' }
        ]
    };
    
    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.classList.remove('open');
            return;
        }
        
        query = query.toLowerCase();
        let results = [];
        
        // Search in farmers
        searchData.farmers.forEach(item => {
            if (item.name.toLowerCase().includes(query) || 
                item.village.toLowerCase().includes(query) ||
                item.crop.toLowerCase().includes(query) ||
                item.phone.includes(query)) {
                results.push({
                    type: 'farmer',
                    icon: 'fas fa-user',
                    iconClass: 'farmer',
                    title: item.name,
                    subtitle: `${item.crop} • ${item.village}`,
                    tag: 'Farmer'
                });
            }
        });
        
        // Search in produce
        searchData.produce.forEach(item => {
            if (item.name.toLowerCase().includes(query) || 
                item.batch.toLowerCase().includes(query)) {
                results.push({
                    type: 'produce',
                    icon: 'fas fa-seedling',
                    iconClass: 'produce',
                    title: item.name,
                    subtitle: `Grade: ${item.grade} • ${item.quantity}`,
                    tag: 'Produce'
                });
            }
        });
        
        // Search in orders
        searchData.orders.forEach(item => {
            if (item.id.toLowerCase().includes(query) || 
                item.buyer.toLowerCase().includes(query) ||
                item.item.toLowerCase().includes(query)) {
                results.push({
                    type: 'order',
                    icon: 'fas fa-shopping-bag',
                    iconClass: 'order',
                    title: item.id,
                    subtitle: `${item.item} • ${item.buyer}`,
                    tag: 'Order'
                });
            }
        });
        
        // Search in payments
        searchData.payments.forEach(item => {
            if (item.id.toLowerCase().includes(query) || 
                item.farmer.toLowerCase().includes(query) ||
                item.amount.includes(query)) {
                results.push({
                    type: 'payment',
                    icon: 'fas fa-coins',
                    iconClass: 'payment',
                    title: item.farmer,
                    subtitle: `${item.amount} • ${item.status}`,
                    tag: 'Payment'
                });
            }
        });
        
        // Search in inventory
        searchData.inventory.forEach(item => {
            if (item.name.toLowerCase().includes(query) || 
                item.batch.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query)) {
                results.push({
                    type: 'inventory',
                    icon: 'fas fa-warehouse',
                    iconClass: 'inventory',
                    title: item.name,
                    subtitle: `${item.location} • ${item.batch}`,
                    tag: 'Inventory'
                });
            }
        });
        
        // Limit results to 10
        results = results.slice(0, 10);
        
        displayResults(results, query);
    }
    
    function displayResults(results, query) {
        const container = searchResults;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "<strong>${query}</strong>"</p>
                </div>
            `;
            container.classList.add('open');
            return;
        }
        
        let html = '';
        results.forEach(result => {
            // Highlight matching text
            let title = result.title;
            let subtitle = result.subtitle;
            if (query.length > 0) {
                const regex = new RegExp(`(${query})`, 'gi');
                title = title.replace(regex, '<span class="highlight">$1</span>');
                subtitle = subtitle.replace(regex, '<span class="highlight">$1</span>');
            }
            
            html += `
                <div class="result-item" onclick="handleResultClick('${result.type}', '${result.title.replace(/<[^>]*>/g, '')}')">
                    <div class="result-icon ${result.iconClass}">
                        <i class="${result.icon}"></i>
                    </div>
                    <div class="result-info">
                        <h5>${title}</h5>
                        <p>${subtitle}</p>
                    </div>
                    <span class="result-tag">${result.tag}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
        container.classList.add('open');
    }
    
    // Global function for result click
    window.handleResultClick = function(type, title) {
        alert(`🔍 Found: ${title}\n📂 Category: ${type}\n✅ Click to view details`);
        searchResults.classList.remove('open');
        searchInput.value = title;
    };
    
    // Search input events
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        performSearch(query);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            performSearch(this.value.trim());
        }
    });
    
    // Close search on outside click
    document.addEventListener('click', function(e) {
        if (!searchInput.parentElement.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('open');
        }
    });
    
    // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        if (e.key === 'Escape') {
            searchResults.classList.remove('open');
            searchInput.blur();
        }
    });

    // ============================================
    // LOGIN FUNCTIONALITY
    // ============================================
    const loginOverlay = document.getElementById('loginOverlay');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    if (sessionStorage.getItem('loggedIn') === 'true') {
        loginOverlay.classList.remove('active');
    } else {
        loginOverlay.classList.add('active');
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        if (username === 'aryan' && password === 'admin') {
            sessionStorage.setItem('loggedIn', 'true');
            loginOverlay.classList.remove('active');
            loginError.classList.remove('show');
        } else {
            loginError.classList.add('show');
            setTimeout(() => {
                loginError.classList.remove('show');
            }, 3000);
        }
    });

    // ============================================
    // ADMIN PANEL
    // ============================================
    const adminPanel = document.getElementById('adminPanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const closeAdminBtn = document.getElementById('closeAdminPanel');
    
    window.openAdminPanel = function() {
        adminPanel.classList.add('open');
        panelOverlay.classList.add('active');
    };
    
    function closeAdminPanel() {
        adminPanel.classList.remove('open');
        panelOverlay.classList.remove('active');
    }
    
    document.getElementById('adminProfileBtn').addEventListener('click', openAdminPanel);
    
    closeAdminBtn.addEventListener('click', closeAdminPanel);
    panelOverlay.addEventListener('click', closeAdminPanel);

    // ============================================
    // LOGOUT
    // ============================================
    function logout() {
        sessionStorage.removeItem('loggedIn');
        loginOverlay.classList.add('active');
        closeAdminPanel();
    }
    
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    });
    
    document.getElementById('logoutBtnSidebar').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    });

    // ============================================
    // NOTIFICATIONS
    // ============================================
    const notifBtn = document.getElementById('notificationBtn');
    const notifDropdown = document.getElementById('notificationDropdown');
    let notifOpen = false;
    
    notifBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notifOpen = !notifOpen;
        if (notifOpen) {
            notifDropdown.classList.add('open');
        } else {
            notifDropdown.classList.remove('open');
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
            notifDropdown.classList.remove('open');
            notifOpen = false;
        }
    });
    
    window.clearNotifications = function() {
        const notifList = document.getElementById('notifList');
        notifList.innerHTML = `
            <div class="notif-empty">
                <i class="fas fa-check-circle"></i>
                <p>All notifications cleared!</p>
            </div>
        `;
        document.querySelector('.badge-dot').style.display = 'none';
        notifDropdown.classList.remove('open');
        notifOpen = false;
        return false;
    };

    // ============================================
    // TAB NAVIGATION
    // ============================================
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('pageTitle');

    const tabNames = {
        dashboard: 'Dashboard',
        farmers: 'Farmers Management',
        produce: 'Produce Registration',
        inventory: 'Inventory / Storage',
        marketplace: 'Marketplace',
        orders: 'Orders',
        logistics: 'Logistics / Delivery',
        payments: 'Payments'
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.dataset.tab;
            tabContents.forEach(tab => tab.classList.remove('active'));
            const targetTab = document.getElementById(`tab-${tabId}`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
            pageTitle.textContent = tabNames[tabId] || tabId;
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });

    // ============================================
    // MOBILE SIDEBAR TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isSidebar = sidebar.contains(e.target);
            const isToggle = menuToggle.contains(e.target);
            if (!isSidebar && !isToggle) {
                sidebar.classList.remove('open');
            }
        }
    });

    // ============================================
    // CHART.JS - ORDERS CHART
    // ============================================
    const ordersCtx = document.getElementById('ordersChart');
    if (ordersCtx) {
        const existingChart = Chart.getChart('ordersChart');
        if (existingChart) {
            existingChart.destroy();
        }
        
        new Chart(ordersCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Orders',
                    data: [12, 18, 25, 32, 40, 48, 55],
                    borderColor: '#2D6A4F',
                    backgroundColor: 'rgba(45, 106, 79, 0.15)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2D6A4F',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 77, 62, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 10,
                        padding: 14,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Orders: ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.06)',
                            drawBorder: false
                        },
                        ticks: {
                            font: { size: 11, weight: '500' },
                            stepSize: 10,
                            color: '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { size: 11, weight: '500' },
                            color: '#666'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // ============================================
    // CHART.JS - CROPS CHART
    // ============================================
    const cropsCtx = document.getElementById('cropsChart');
    if (cropsCtx) {
        const existingChart = Chart.getChart('cropsChart');
        if (existingChart) {
            existingChart.destroy();
        }
        
        new Chart(cropsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Wheat', 'Rice', 'Vegetables', 'Fruits', 'Pulses'],
                datasets: [{
                    data: [40, 25, 20, 10, 5],
                    backgroundColor: [
                        '#2D6A4F',
                        '#40916C',
                        '#52B788',
                        '#74C69D',
                        '#95D5B2'
                    ],
                    borderWidth: 3,
                    borderColor: '#fff',
                    hoverOffset: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 16,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12,
                                weight: '600'
                            },
                            boxWidth: 10,
                            color: '#1a1a2e'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 77, 62, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 10,
                        padding: 14,
                        callbacks: {
                            label: function(context) {
                                let total = context.dataset.data.reduce((a, b) => a + b, 0);
                                let percentage = ((context.parsed / total) * 100).toFixed(1);
                                return context.label + ': ' + percentage + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // ============================================
    // RECENT TRANSACTIONS
    // ============================================
    const transactions = [
        { farmer: 'Ramesh Kumar', produce: 'Wheat', qty: '240 kg', amount: '₹28,000', status: 'Paid' },
        { farmer: 'Sita Devi', produce: 'Rice', qty: '180 kg', amount: '₹22,500', status: 'Paid' },
        { farmer: 'Amit Sharma', produce: 'Tomatoes', qty: '320 kg', amount: '₹35,200', status: 'Pending' },
        { farmer: 'Priya Patel', produce: 'Onions', qty: '150 kg', amount: '₹12,000', status: 'Paid' },
        { farmer: 'Gopal Singh', produce: 'Pulses', qty: '95 kg', amount: '₹14,250', status: 'Processing' },
        { farmer: 'Meena Devi', produce: 'Mangoes', qty: '210 kg', amount: '₹42,000', status: 'Paid' },
        { farmer: 'Rajesh Kumar', produce: 'Potatoes', qty: '500 kg', amount: '₹25,000', status: 'Paid' }
    ];

    const tbody = document.getElementById('recentTransactions');
    if (tbody) {
        tbody.innerHTML = '';
        transactions.forEach(t => {
            const statusClass = t.status === 'Paid' ? 'success' :
                                t.status === 'Pending' ? 'warning' : 'info';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${t.farmer}</strong></td>
                <td>${t.produce}</td>
                <td>${t.qty}</td>
                <td>${t.amount}</td>
                <td><span class="status-badge ${statusClass}">${t.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    // ============================================
    // KEYBOARD SHORTCUT HINT
    // ============================================
    console.log('🌾 AgriFlow - Digital FPO Management Platform');
    console.log('🚀 Built for Hackathon Demo');
    console.log('📈 Login: Username: aryan | Password: admin');
    console.log('🔍 Search: Press Ctrl+K (or Cmd+K) to focus search');
    console.log('✅ All features ready!');
});
