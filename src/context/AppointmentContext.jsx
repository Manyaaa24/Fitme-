import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/mockApi";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const refreshAppointments = async () => {
    const data = await api.getMyAppointments();
    setAppointments(data);
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointments, refreshAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
