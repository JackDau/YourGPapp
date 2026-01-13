/**
 * Your GP Patient Portal - Main Application JavaScript
 *
 * This file contains shared functionality for the patient portal.
 * For a production app, this would connect to the Best Practice API.
 */

// ================================
// NAVIGATION
// ================================

/**
 * Toggle the "More" menu in bottom navigation
 */
function toggleMoreMenu() {
  const menu = document.getElementById('moreMenu');
  const backdrop = document.getElementById('moreMenuBackdrop');

  if (menu && backdrop) {
    menu.classList.toggle('open');
    backdrop.classList.toggle('open');
  }
}

/**
 * Close the "More" menu
 */
function closeMoreMenu() {
  const menu = document.getElementById('moreMenu');
  const backdrop = document.getElementById('moreMenuBackdrop');

  if (menu && backdrop) {
    menu.classList.remove('open');
    backdrop.classList.remove('open');
  }
}

// ================================
// GREETING
// ================================

/**
 * Set greeting based on time of day
 * @param {string} name - User's first name
 */
function setGreeting(name = 'there') {
  const hour = new Date().getHours();
  let greeting = 'Hello';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening';
  }

  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    greetingEl.textContent = `${greeting}, ${name}`;
  }
}

// ================================
// FORM UTILITIES
// ================================

/**
 * Toggle password visibility
 * @param {string} inputId - ID of the password input
 */
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}

/**
 * Validate password against requirements
 * @param {string} password - Password to validate
 * @returns {Object} - Object with requirement status
 */
function validatePassword(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
}

// ================================
// DATE UTILITIES
// ================================

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-AU', options);
}

/**
 * Format time for display
 * @param {Date} date - Date to format
 * @returns {string} - Formatted time string
 */
function formatTime(date) {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleTimeString('en-AU', options);
}

/**
 * Get relative date string (e.g., "Tomorrow", "Today", "Monday")
 * @param {Date} date - Date to format
 * @returns {string} - Relative date string
 */
function getRelativeDate(date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' });
  }
}

// ================================
// TOAST NOTIFICATIONS
// ================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast ('success', 'error', 'info')
 * @param {number} duration - Duration in ms (default 4000)
 */
function showToast(message, type = 'info', duration = 4000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => toast.classList.add('show'), 10);

  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ================================
// TABS
// ================================

/**
 * Initialize tab functionality
 */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
    });
  });
}

// ================================
// CALENDAR (Appointment Booking)
// ================================

/**
 * Select a date in the calendar
 * @param {HTMLElement} element - Calendar day element
 */
function selectDate(element) {
  if (element.classList.contains('disabled')) return;

  document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');
  });
  element.classList.add('selected');
}

/**
 * Select a time slot
 * @param {HTMLElement} element - Time slot element
 */
function selectTime(element) {
  document.querySelectorAll('.time-slot').forEach(slot => {
    slot.classList.remove('selected');
  });
  element.classList.add('selected');
}

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabs if present
  initTabs();

  // Close more menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-item') && !e.target.closest('.more-menu')) {
      closeMoreMenu();
    }
  });
});

// ================================
// MOCK DATA (For Demo)
// ================================

const MOCK_USER = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.j@email.com',
  dob: '1985-03-15',
  phone: '0412 345 678'
};

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    date: new Date('2026-01-21T09:30:00'),
    doctor: 'Dr. James Wilson',
    type: 'Standard Consultation',
    duration: 15,
    mode: 'in-person'
  },
  {
    id: 2,
    date: new Date('2026-01-24T14:00:00'),
    doctor: 'Dr. Emily Chen',
    type: 'Long Telehealth',
    duration: 30,
    mode: 'telehealth'
  }
];

const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    name: 'Metformin 500mg',
    instructions: 'Take twice daily with meals',
    repeatsRemaining: 4,
    lastDispensed: '2026-01-05'
  },
  {
    id: 2,
    name: 'Lisinopril 10mg',
    instructions: 'Take once daily',
    repeatsRemaining: 2,
    lastDispensed: '2026-01-12'
  },
  {
    id: 3,
    name: 'Atorvastatin 20mg',
    instructions: 'Take once daily at night',
    repeatsRemaining: 0,
    lastDispensed: '2025-12-01'
  }
];
