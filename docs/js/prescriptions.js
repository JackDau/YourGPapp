/**
 * Your GP Patient Portal - Prescriptions Module
 * Handles medication display, repeat request flow, and localStorage persistence
 */

const PrescriptionsModule = (function() {
  // ================================
  // CONSTANTS
  // ================================

  const STORAGE_KEY = 'yourgp_prescription_requests';
  const REQUEST_STATE_KEY = 'yourgp_prescription_request_state';

  // Demo medications (in production, fetched from Best Practice API)
  const DEMO_MEDICATIONS = [
    {
      id: 'med_1',
      name: 'Metformin 500mg',
      purpose: 'Diabetes management',
      directions: 'Take twice daily with meals',
      repeatsRemaining: 4,
      lastPrescribed: '2026-01-05',
      isControlled: false
    },
    {
      id: 'med_2',
      name: 'Lisinopril 10mg',
      purpose: 'Blood pressure control',
      directions: 'Take once daily',
      repeatsRemaining: 2,
      lastPrescribed: '2026-01-12',
      isControlled: false
    },
    {
      id: 'med_3',
      name: 'Atorvastatin 20mg',
      purpose: 'Cholesterol management',
      directions: 'Take once daily at night',
      repeatsRemaining: 0,
      lastPrescribed: '2025-12-01',
      isControlled: false
    },
    {
      id: 'med_4',
      name: 'Temazepam 10mg',
      purpose: 'Sleep aid',
      directions: 'Take as needed for sleep',
      repeatsRemaining: 1,
      lastPrescribed: '2025-11-15',
      isControlled: true // Sleeping tablet - not available via app
    },
    {
      id: 'med_5',
      name: 'Panadeine Forte',
      purpose: 'Pain relief',
      directions: 'Take as directed for pain',
      repeatsRemaining: 0,
      lastPrescribed: '2025-10-20',
      isControlled: true // Strong pain relief - not available via app
    }
  ];

  const DELIVERY_OPTIONS = {
    'pickup': { id: 'pickup', name: 'Pick-up at clinic', icon: '🏥', description: 'Collect from our reception' },
    'email': { id: 'email', name: 'Email', icon: '📧', description: 'Sent to your registered email' },
    'sms': { id: 'sms', name: 'SMS', icon: '📱', description: 'Sent via text message' }
  };

  const URGENCY_OPTIONS = {
    'routine': { id: 'routine', name: 'Routine', description: '2-3 business days' },
    'urgent': { id: 'urgent', name: 'Urgent', description: 'Same day if possible' }
  };

  // ================================
  // MEDICATIONS
  // ================================

  /**
   * Get all medications for the patient
   */
  function getMedications() {
    // In production, this would fetch from Best Practice API
    return DEMO_MEDICATIONS;
  }

  /**
   * Get medication by ID
   */
  function getMedicationById(id) {
    return DEMO_MEDICATIONS.find(med => med.id === id);
  }

  /**
   * Get non-controlled medications (available for app requests)
   */
  function getAvailableMedications() {
    return DEMO_MEDICATIONS.filter(med => !med.isControlled);
  }

  /**
   * Get controlled medications (not available for app requests)
   */
  function getControlledMedications() {
    return DEMO_MEDICATIONS.filter(med => med.isControlled);
  }

  // ================================
  // REQUEST STATE (sessionStorage)
  // ================================

  /**
   * Get current request state
   */
  function getRequestState() {
    const stored = sessionStorage.getItem(REQUEST_STATE_KEY);
    if (!stored) return {};

    try {
      return JSON.parse(stored);
    } catch (e) {
      return {};
    }
  }

  /**
   * Update request state
   */
  function updateRequestState(updates) {
    const current = getRequestState();
    const newState = { ...current, ...updates };
    sessionStorage.setItem(REQUEST_STATE_KEY, JSON.stringify(newState));
    return newState;
  }

  /**
   * Clear request state
   */
  function clearRequestState() {
    sessionStorage.removeItem(REQUEST_STATE_KEY);
  }

  // ================================
  // REQUEST HISTORY (localStorage)
  // ================================

  /**
   * Get all prescription requests from localStorage
   */
  function getRequests() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing prescription requests:', e);
      return [];
    }
  }

  /**
   * Save requests to localStorage
   */
  function saveRequests(requests) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }

  /**
   * Submit a prescription request
   */
  function submitRequest() {
    const state = getRequestState();

    if (!state.selectedMedications || state.selectedMedications.length === 0) {
      throw new Error('No medications selected');
    }

    if (!state.delivery) {
      throw new Error('No delivery method selected');
    }

    if (!state.urgency) {
      throw new Error('No urgency level selected');
    }

    const requests = getRequests();
    const newRequest = {
      id: generateId(),
      medications: state.selectedMedications.map(sel => {
        const med = getMedicationById(sel.medicationId);
        return {
          medicationId: sel.medicationId,
          name: med.name,
          purpose: med.purpose,
          quantity: sel.quantity
        };
      }),
      delivery: state.delivery,
      deliveryName: DELIVERY_OPTIONS[state.delivery].name,
      urgency: state.urgency,
      urgencyName: URGENCY_OPTIONS[state.urgency].name,
      notes: state.notes || '',
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    requests.push(newRequest);
    saveRequests(requests);
    clearRequestState();

    return newRequest;
  }

  /**
   * Get pending requests
   */
  function getPendingRequests() {
    return getRequests().filter(req => req.status === 'pending');
  }

  /**
   * Get completed requests
   */
  function getCompletedRequests() {
    return getRequests().filter(req => req.status === 'completed');
  }

  // ================================
  // UTILITIES
  // ================================

  function generateId() {
    return 'rx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /**
   * Get badge class based on repeats remaining
   */
  function getRepeatsBadgeClass(repeats) {
    if (repeats === 0) return 'badge-error';
    if (repeats <= 2) return 'badge-warning';
    return 'badge-success';
  }

  /**
   * Get icon background color based on repeats remaining
   */
  function getIconBgColor(repeats) {
    if (repeats === 0) return 'var(--color-error-light)';
    if (repeats <= 2) return 'var(--color-warning-light)';
    return 'var(--color-success-light)';
  }

  // ================================
  // PUBLIC API
  // ================================

  return {
    // Constants
    DELIVERY_OPTIONS,
    URGENCY_OPTIONS,

    // Medications
    getMedications,
    getMedicationById,
    getAvailableMedications,
    getControlledMedications,

    // Request flow
    getRequestState,
    updateRequestState,
    clearRequestState,
    submitRequest,

    // Request history
    getRequests,
    getPendingRequests,
    getCompletedRequests,

    // Utilities
    formatDate,
    getRepeatsBadgeClass,
    getIconBgColor
  };
})();
