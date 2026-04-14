export const api = {
  login: async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  signup: async (name, email, password) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Signup failed');
    }
    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  updateName: async (email, preferredName) => {
    const response = await fetch(`/api/users/${email}/name`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferredName }),
    });
    if (!response.ok) throw new Error('Failed to update name');
    
    // Update local storage so the new name persists instantly
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email) {
      user.name = preferredName;
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  },

  getDoctors: async () => {
    const response = await fetch('/api/doctors');
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return await response.json();
  },

  getDoctorById: async (id) => {
    const response = await fetch(`/api/doctors/${id}`);
    if (!response.ok) throw new Error('Doctor not found');
    return await response.json();
  },

  getHealthData: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email || '';
    const response = await fetch(`/api/health-data?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch health data');
    return await response.json();
  },

  bookAppointment: async (appointmentData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const payload = { ...appointmentData, patientEmail: user?.email };
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to book appointment');
    return await response.json();
  },

  getMyAppointments: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email || '';
    const response = await fetch(`/api/appointments?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return await response.json();
  },

  cancelAppointment: async (id) => {
    const response = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to cancel appointment');
    return true;
  },
};

