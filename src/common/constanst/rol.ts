export const SECRETARY = { id: 1, name: 'secretary' };
export const COORDINATOR = { id: 2, name: 'coordinator' };
export const RECTOR = { id: 3, name: 'rector' };
export const STUDENT = { id: 4, name: 'student' };
export const TEACHER = { id: 5, name: 'teacher' };
export const ALL_ADMIN = [ SECRETARY.name, COORDINATOR.name, RECTOR.name ]

//Init data base
export const initDataDB = [
  { id: SECRETARY.id, name: SECRETARY.name },
  { id: COORDINATOR.id, name: COORDINATOR.name },
  { id: RECTOR.id, name: RECTOR.name },
  { id: STUDENT.id, name: STUDENT.name },
  { id: TEACHER.id, name: TEACHER.name },
]