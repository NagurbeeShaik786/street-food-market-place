// Main JavaScript file for Street Food Marketplace

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if Bootstrap tooltips are used
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Auto-hide alerts after 5 seconds
    setTimeout(function() {
        var alerts = document.querySelectorAll('.alert.alert-dismissible');
        alerts.forEach(function(alert) {
            var bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        });
    }, 5000);

    // Form validation enhancement
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Price calculation for order form
    var quantityInput = document.getElementById('quantity');
    var totalPriceInput = document.getElementById('total_price');
    
    if (quantityInput && totalPriceInput) {
        var pricePerUnit = parseFloat(quantityInput.dataset.price) || 0;
        
        quantityInput.addEventListener('input', function() {
            var quantity = parseInt(this.value) || 0;
            var total = quantity * pricePerUnit;
            totalPriceInput.value = total.toFixed(2);
        });
    }

    // Search functionality enhancement
    var searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.closest('form').submit();
            }
        });
    }

    // Confirm dialog for destructive actions
    var deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            var message = this.dataset.confirm || 'Are you sure?';
            if (!confirm(message)) {
                e.preventDefault();
            }
        });
    });

    // Loading state for forms
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function() {
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Please wait...';
            }
        });
    });

    // Auto-focus on first input of forms
    var firstInput = document.querySelector('form input:not([type="hidden"]):first-of-type');
    if (firstInput) {
        firstInput.focus();
    }

    // Number input validation
    var numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            var min = parseFloat(this.min);
            var max = parseFloat(this.max);
            var value = parseFloat(this.value);
            
            if (!isNaN(min) && value < min) {
                this.value = min;
            }
            if (!isNaN(max) && value > max) {
                this.value = max;
            }
        });
    });

    // Material category icons mapping
    var categoryIcons = {
        'vegetables': 'fas fa-carrot',
        'spices': 'fas fa-pepper-hot',
        'grains': 'fas fa-seedling',
        'oil': 'fas fa-tint',
        'utensils': 'fas fa-utensils',
        'packaging': 'fas fa-box',
        'dairy': 'fas fa-glass-whiskey',
        'meat': 'fas fa-drumstick-bite',
        'condiments': 'fas fa-bottle-droplet',
        'other': 'fas fa-ellipsis-h'
    };

    // Add icons to category badges
    var categoryBadges = document.querySelectorAll('.badge[data-category]');
    categoryBadges.forEach(function(badge) {
        var category = badge.dataset.category;
        var icon = categoryIcons[category] || categoryIcons['other'];
        badge.innerHTML = '<i class="' + icon + ' me-1"></i>' + badge.textContent;
    });

    // Smooth scrolling for anchor links
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Real-time form validation feedback
    var inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });

    // Enhanced table row click functionality
    var tableRows = document.querySelectorAll('table tbody tr[data-href]');
    tableRows.forEach(function(row) {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            window.location.href = this.dataset.href;
        });
    });

    // Mobile menu improvements
    var navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            var navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
});

// Utility functions
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toFixed(2);
}

function showAlert(message, type = 'info') {
    var alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    var container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertContainer, container.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            var bsAlert = new bootstrap.Alert(alertContainer);
            bsAlert.close();
        }, 5000);
    }
}

function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Export functions for global use
window.marketplace = {
    formatCurrency: formatCurrency,
    showAlert: showAlert,
    confirmAction: confirmAction
};
