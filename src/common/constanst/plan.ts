import { SECRETARY, COORDINATOR, HEADQUARTER, STUDENT, TEACHER, SCHOOL_YEAR, OBSERVATION, ASSISTANCE, SCORE } from './permission';

const permissionsDefault = [SECRETARY.id, COORDINATOR.id, HEADQUARTER.id, STUDENT.id, TEACHER.id, SCHOOL_YEAR.id, OBSERVATION.id, ASSISTANCE.id, SCORE.id];

export const BASIC = { id: 1, name: 'basic', permissions: permissionsDefault };
export const PROFESSIONAL = { id: 2, name: 'professional', permissions: permissionsDefault };
export const ADVANCED = { id: 3, name: 'advanced', permissions: permissionsDefault };
export const PLAN_STUDENTS = { id: 4, name: 'plan_students', permissions: permissionsDefault };

//Init data base
export const initDataDB = [
  { ...BASIC, price: 490000, description: "Herramientas para impulsar el crecimiento de su institución." },
  { ...PROFESSIONAL, price: 990000, description: "Características esenciales para acelerar su crecimiento." },
  { ...ADVANCED, price: 1990000, description: "Todas las características para optimizar sus procesos." },
  { ...PLAN_STUDENTS, price: 8000, description: "Ideales para pocos y sabios estudiantes." }
]