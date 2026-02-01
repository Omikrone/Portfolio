import type { Event } from '../types/event';

export const events: Event[] = [
    {
        id: "24hIUT2025",
        name: "24h des IUT Informatiques 2025",
        description: "Compétition nationale de cybersécurité regroupant les IUT informatiques de France",
        teamName: "Les Tartelettes aux framboises",
        rank: "3ème",
        score: "2900 points",
        date: "2025-05-24",
        resultsUrl: "https://24hinfo.iut.fr/2025-epreuves-et-resultats/"
    }
];

export const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
};
