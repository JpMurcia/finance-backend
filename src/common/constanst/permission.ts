export const SECRETARY = { id: 1, name: 'secretary' };
export const COORDINATOR = { id: 2, name: 'coordinator' };
export const HEADQUARTER = { id: 3, name: 'headquarter' };
export const STUDENT = { id: 4, name: 'student' };
export const TEACHER = { id: 5, name: 'teacher' };
export const SCHOOL_YEAR = { id: 6, name: 'school_year' };
export const OBSERVATION = { id: 7, name: 'observation' };
export const ASSISTANCE = { id: 8, name: 'assistance' };
export const SCORE = { id: 9, name: 'score' };

//Init data base
export const initDataDB = [
  { ...SECRETARY },
  { ...COORDINATOR },
  { ...HEADQUARTER },
  { ...STUDENT },
  { ...TEACHER },
  { ...SCHOOL_YEAR },
  { ...OBSERVATION },
  { ...ASSISTANCE },
  { id: SCORE.id, name: SCORE.name }
]