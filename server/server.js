import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;
const dbPath = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Delay middleware to simulate network latency
app.use((req, res, next) => {
  setTimeout(next, 500); // 500ms delay for all requests
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users[email];

  if (user && user.password === password) {
    const { password: _, ...userData } = user;
    res.json(userData);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();

  if (db.users[email]) {
    return res.status(400).json({ error: 'User already exists' });
  }

  db.users[email] = { password, name, role: 'patient', email };
  writeDB(db);

  res.status(201).json({ name, email, role: 'patient' });
});

app.put('/api/users/:email/name', (req, res) => {
  const { preferredName } = req.body;
  const db = readDB();
  
  if (db.users[req.params.email]) {
    db.users[req.params.email].name = preferredName;
    writeDB(db);
    res.json({ success: true, name: preferredName });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/api/doctors', (req, res) => {
  const db = readDB();
  res.json(db.doctors);
});

app.get('/api/doctors/:id', (req, res) => {
  const db = readDB();
  const doctor = db.doctors.find((d) => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

app.get('/api/health-data', (req, res) => {
  const db = readDB();
  const email = req.query.email;
  // Make patient@example.com the dummy user with populated data
  if (email === 'patient@example.com') {
    res.json(db.healthData);
  } else if (email === 'manya.ladkani2023@vitstudent.ac.in') {
    res.json(db.healthDataManya);
  } else {
    // New/other users start with no data
    res.json({
      vitals: null,
      prescriptions: [],
      labResults: [],
      notifications: [],
      upcomingAppointments: []
    });
  }
});

app.post('/api/appointments', (req, res) => {
  const appointmentData = req.body;
  const db = readDB();
  
  const newAppointment = {
    id: Date.now(),
    ...appointmentData,
    status: 'confirmed',
    bookedAt: new Date().toISOString(),
  };

  db.appointments.push(newAppointment);
  writeDB(db);

  res.status(201).json(newAppointment);
});

app.get('/api/appointments', (req, res) => {
  const db = readDB();
  const email = req.query.email;
  
  // Dummy appointments have no patientEmail by default
  const userAppts = db.appointments.filter(
    (a) => a.patientEmail === email || (email === 'patient@example.com' && !a.patientEmail)
  );
  
  res.json(userAppts);
});

app.delete('/api/appointments/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const initialLength = db.appointments.length;
  db.appointments = db.appointments.filter((a) => a.id !== id);

  if (db.appointments.length < initialLength) {
    writeDB(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});

// Endpoint to generate and download a dummy report
app.get('/api/reports/:id/download', (req, res) => {
  const id = req.params.id;
  const reportText = `=========================================
      ONLINE MEDICAL REPORT 
=========================================
Report ID: ${id}
Date Generated: ${new Date().toLocaleDateString()}

PATIENT DETAILS:
Name: Mani
Patient ID: P-120045
Status: Reviewed

PHYSICIAN REMARKS:
All vital signs are stable and within normal parameters.
Blood test results are normal.
No immediate concerns.

RECOMMENDATIONS:
- Maintain a balanced diet (high proteins, low carbs).
- Minimum 30 mins moderate exercise 5 times a week.
- Stay hydrated.

=========================================
This is a computer-generated dummy report.
=========================================`;

  res.setHeader('Content-disposition', `attachment; filename=medical_report_${id}.txt`);
  res.setHeader('Content-type', 'text/plain');
  res.charset = 'UTF-8';
  res.send(reportText);
});

app.listen(port, () => {
  console.log(`FitMe Backend Server running on http://localhost:${port}`);
});
