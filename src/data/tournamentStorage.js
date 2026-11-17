import { tournaments as initialTournaments } from "./tournaments";

export const getTournaments = () => {
  const savedTournaments = localStorage.getItem("adminTournaments");

  return savedTournaments
    ? JSON.parse(savedTournaments)
    : initialTournaments;
};

export const saveTournaments = (tournaments) => {
  localStorage.setItem("adminTournaments", JSON.stringify(tournaments));
};