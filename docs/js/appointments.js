/**
 * Your GP Patient Portal - Appointments Module
 * Handles appointment booking, state management, and localStorage persistence
 */

const AppointmentsModule = (function() {
  // ================================
  // CONSTANTS
  // ================================

  const STORAGE_KEY = 'yourgp_appointments';
  const BOOKING_STATE_KEY = 'yourgp_booking_state';

  const APPOINTMENT_TYPES = {
    'standard': {
      id: 'standard',
      name: 'Standard Consultation',
      duration: 15,
      mode: 'in-person',
      icon: '🏥',
      description: 'General health concerns, follow-ups, quick questions'
    },
    'long': {
      id: 'long',
      name: 'Long Consultation',
      duration: 30,
      mode: 'in-person',
      icon: '🏥',
      description: 'Complex issues, multiple concerns, mental health'
    },
    'telehealth-standard': {
      id: 'telehealth-standard',
      name: 'Standard Telehealth',
      duration: 15,
      mode: 'telehealth',
      icon: '📹',
      description: 'Video consultation from home'
    },
    'telehealth-long': {
      id: 'telehealth-long',
      name: 'Long Telehealth',
      duration: 30,
      mode: 'telehealth',
      icon: '📹',
      description: 'Extended video consultation'
    }
  };

  const PRACTITIONERS = {
    'wilson': {
      id: 'wilson',
      name: 'Dr. James Wilson',
      title: 'General Practitioner',
      initials: 'JW',
      color: '#32373c',
      availableDays: [1, 2, 3, 4, 5] // Mon-Fri
    },
    'chen': {
      id: 'chen',
      name: 'Dr. Emily Chen',
      title: 'General Practitioner',
      initials: 'EC',
      color: '#7c3aed',
      availableDays: [1, 3, 5] // Mon, Wed, Fri
    },
    'park': {
      id: 'park',
      name: 'Dr. Sarah Park',
      title: 'General Practitioner',
      initials: 'SP',
      color: '#0891b2',
      availableDays: [2, 4] // Tue, Thu
    },
    'nurse': {
      id: 'nurse',
      name: 'Nurse Rebecca Torres',
      title: 'Practice Nurse',
      initials: 'RT',
      color: '#059669',
      availableDays: [1, 2, 3, 4, 5]
    }
  };

  const TIME_SLOTS = [
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45'
  ];

  const PRACTICE_INFO = {
    name: 'Your GP',
    address: '123 Example Street',
    suburb: 'Canberra ACT 2600',
    phone: '(02) 6123 4567'
  };

  // ================================
  // STATE MANAGEMENT
  // ================================

  /**
   * Get all appointments from localStorage
   */
  function getAppointments() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      const appointments = JSON.parse(stored);
      // Convert date strings back to Date objects
      return appointments.map(apt => ({
        ...apt,
        dateTime: new Date(apt.dateTime)
      }));
    } catch (e) {
      console.error('Error parsing appointments:', e);
      return [];
    }
  }

  /**
   * Save appointments to localStorage
   */
  function saveAppointments(appointments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }

  /**
   * Add a new appointment
   */
  function addAppointment(appointment) {
    const appointments = getAppointments();
    const newAppointment = {
      ...appointment,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    appointments.push(newAppointment);
    saveAppointments(appointments);
    return newAppointment;
  }

  /**
   * Cancel an appointment
   */
  function cancelAppointment(appointmentId, reason = '') {
    console.log('cancelAppointment called with ID:', appointmentId);
    const appointments = getAppointments();
    console.log('All appointments:', appointments.map(a => ({ id: a.id, status: a.status })));

    const index = appointments.findIndex(apt => apt.id === appointmentId);
    console.log('Found index:', index);

    if (index !== -1) {
      appointments[index].status = 'cancelled';
      appointments[index].cancelReason = reason;
      appointments[index].cancelledAt = new Date().toISOString();
      saveAppointments(appointments);
      console.log('Appointment cancelled and saved');
      return true;
    }
    console.log('Appointment not found');
    return false;
  }

  /**
   * Get upcoming appointments (future, not cancelled)
   */
  function getUpcomingAppointments() {
    const now = new Date();
    return getAppointments()
      .filter(apt => apt.dateTime > now && apt.status !== 'cancelled')
      .sort((a, b) => a.dateTime - b.dateTime);
  }

  /**
   * Get past appointments
   */
  function getPastAppointments() {
    const now = new Date();
    return getAppointments()
      .filter(apt => apt.dateTime <= now || apt.status === 'cancelled')
      .sort((a, b) => b.dateTime - a.dateTime);
  }

  /**
   * Get appointment by ID
   */
  function getAppointmentById(id) {
    return getAppointments().find(apt => apt.id === id);
  }

  // ================================
  // BOOKING STATE
  // ================================

  /**
   * Get current booking state
   */
  function getBookingState() {
    const stored = sessionStorage.getItem(BOOKING_STATE_KEY);
    if (!stored) return {};

    try {
      return JSON.parse(stored);
    } catch (e) {
      return {};
    }
  }

  /**
   * Update booking state
   */
  function updateBookingState(updates) {
    const current = getBookingState();
    const newState = { ...current, ...updates };
    sessionStorage.setItem(BOOKING_STATE_KEY, JSON.stringify(newState));
    return newState;
  }

  /**
   * Clear booking state
   */
  function clearBookingState() {
    sessionStorage.removeItem(BOOKING_STATE_KEY);
  }

  /**
   * Complete booking and create appointment
   */
  function completeBooking(reason = '') {
    const state = getBookingState();

    if (!state.type || !state.practitioner || !state.date || !state.time) {
      throw new Error('Incomplete booking state');
    }

    const appointmentType = APPOINTMENT_TYPES[state.type];
    const practitioner = PRACTITIONERS[state.practitioner];

    // Parse the date and time
    const [year, month, day] = state.date.split('-').map(Number);
    const [hours, minutes] = state.time.split(':').map(Number);
    const dateTime = new Date(year, month - 1, day, hours, minutes);

    const appointment = addAppointment({
      dateTime: dateTime,
      typeId: state.type,
      typeName: appointmentType.name,
      duration: appointmentType.duration,
      mode: appointmentType.mode,
      practitionerId: state.practitioner,
      practitionerName: practitioner.name,
      practitionerTitle: practitioner.title,
      practitionerInitials: practitioner.initials,
      practitionerColor: practitioner.color,
      reason: reason,
      location: PRACTICE_INFO
    });

    clearBookingState();
    return appointment;
  }

  // ================================
  // AVAILABILITY
  // ================================

  /**
   * Get available dates for a practitioner
   */
  function getAvailableDates(practitionerId, startDate, numDays = 30) {
    const practitioner = PRACTITIONERS[practitionerId];
    if (!practitioner) return [];

    const availableDates = [];
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < numDays; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);

      // Check if it's a day the practitioner works
      const dayOfWeek = date.getDay();
      if (practitioner.availableDays.includes(dayOfWeek)) {
        // Check it's not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date >= today) {
          availableDates.push(date);
        }
      }
    }

    return availableDates;
  }

  /**
   * Get available time slots for a date
   */
  function getAvailableSlots(practitionerId, date, duration = 15) {
    // Get existing appointments for this practitioner on this date
    const dateStr = formatDateISO(date);
    const existingAppointments = getAppointments().filter(apt => {
      return apt.practitionerId === practitionerId &&
             apt.status !== 'cancelled' &&
             formatDateISO(apt.dateTime) === dateStr;
    });

    const bookedTimes = existingAppointments.map(apt => {
      const d = new Date(apt.dateTime);
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    });

    // Filter out booked slots
    // For long appointments (30 min), also block the next slot
    let unavailableSlots = [...bookedTimes];

    existingAppointments.forEach(apt => {
      if (apt.duration === 30) {
        const d = new Date(apt.dateTime);
        d.setMinutes(d.getMinutes() + 15);
        unavailableSlots.push(
          `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
        );
      }
    });

    // If booking a long appointment, check that the next slot is also free
    let availableSlots = TIME_SLOTS.filter(slot => !unavailableSlots.includes(slot));

    if (duration === 30) {
      availableSlots = availableSlots.filter((slot, index) => {
        const [hours, mins] = slot.split(':').map(Number);
        const nextSlotTime = new Date(2000, 0, 1, hours, mins + 15);
        const nextSlot = `${String(nextSlotTime.getHours()).padStart(2, '0')}:${String(nextSlotTime.getMinutes()).padStart(2, '0')}`;
        return !unavailableSlots.includes(nextSlot) && TIME_SLOTS.includes(nextSlot);
      });
    }

    // If today, filter out past times
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate.getTime() === today.getTime()) {
      availableSlots = availableSlots.filter(slot => {
        const [hours, mins] = slot.split(':').map(Number);
        const slotTime = new Date(now);
        slotTime.setHours(hours, mins, 0, 0);
        return slotTime > now;
      });
    }

    return availableSlots;
  }

  /**
   * Get next available date for a practitioner
   */
  function getNextAvailableDate(practitionerId) {
    const dates = getAvailableDates(practitionerId, new Date(), 30);
    if (dates.length === 0) return null;

    // Find first date with available slots
    for (const date of dates) {
      const slots = getAvailableSlots(practitionerId, date);
      if (slots.length > 0) {
        return date;
      }
    }

    return dates[0];
  }

  // ================================
  // UTILITIES
  // ================================

  function generateId() {
    return 'apt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function formatDateISO(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function formatDateDisplay(date) {
    const d = new Date(date);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return d.toLocaleDateString('en-AU', options);
  }

  function formatTimeDisplay(date) {
    const d = new Date(date);
    return d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function formatTimeSlot(timeStr) {
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date(2000, 0, 1, hours, mins);
    return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function getRelativeDate(date) {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === today.getTime()) {
      return 'Today';
    } else if (d.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' });
    }
  }

  /**
   * Initialize with some demo appointments
   */
  function initDemoData() {
    const existing = getAppointments();
    if (existing.length > 0) return; // Don't overwrite existing data

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 30, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(14, 0, 0, 0);

    const demoAppointments = [
      {
        id: 'demo_1',
        dateTime: tomorrow,
        typeId: 'standard',
        typeName: 'Standard Consultation',
        duration: 15,
        mode: 'in-person',
        practitionerId: 'wilson',
        practitionerName: 'Dr. James Wilson',
        practitionerTitle: 'General Practitioner',
        practitionerInitials: 'JW',
        practitionerColor: '#32373c',
        reason: 'Follow-up on blood test results',
        location: PRACTICE_INFO,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      },
      {
        id: 'demo_2',
        dateTime: nextWeek,
        typeId: 'telehealth-long',
        typeName: 'Long Telehealth',
        duration: 30,
        mode: 'telehealth',
        practitionerId: 'chen',
        practitionerName: 'Dr. Emily Chen',
        practitionerTitle: 'General Practitioner',
        practitionerInitials: 'EC',
        practitionerColor: '#7c3aed',
        reason: '',
        location: PRACTICE_INFO,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ];

    saveAppointments(demoAppointments);
  }

  // ================================
  // PUBLIC API
  // ================================

  return {
    // Constants
    APPOINTMENT_TYPES,
    PRACTITIONERS,
    PRACTICE_INFO,

    // Appointment CRUD
    getAppointments,
    addAppointment,
    cancelAppointment,
    getAppointmentById,
    getUpcomingAppointments,
    getPastAppointments,

    // Booking flow
    getBookingState,
    updateBookingState,
    clearBookingState,
    completeBooking,

    // Availability
    getAvailableDates,
    getAvailableSlots,
    getNextAvailableDate,

    // Utilities
    formatDateISO,
    formatDateDisplay,
    formatTimeDisplay,
    formatTimeSlot,
    getRelativeDate,

    // Demo
    initDemoData
  };
})();

// Initialize demo data on load
document.addEventListener('DOMContentLoaded', function() {
  AppointmentsModule.initDemoData();
});
