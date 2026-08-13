// ============================================
// WAIT FOR DOM TO LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
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
    // CHART.JS - ORDERS CHART (FIXED - UPWARD TREND)
    // ============================================
    const ordersCtx = document.getElementById('ordersChart');
    if (ordersCtx) {
        // Clear any existing chart
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
                    data: [12, 18, 25, 32, 40, 48, 55], // STRONG UPWARD TREND
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
    // CHART.JS - CROPS CHART (FIXED)
    // ============================================
    const cropsCtx = document.getElementById('cropsChart');
    if (cropsCtx) {
        // Clear any existing chart
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
    // CONSOLE LOG
    // ============================================
    console.log('🌾 AgriFlow - Digital FPO Management Platform');
    console.log('🚀 Built for Hackathon Demo');
    console.log('📈 Charts are now UPWARD trending!');
    console.log('✅ All charts fixed and rendering properly!');
});