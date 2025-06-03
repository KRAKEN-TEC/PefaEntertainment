import useExo, { SingleZone, useSingleExo, Zones } from "./useExo";


export const useZone = () => useExo<Zones>("/zones");

export const useSingleZone = (zoneId: string) => useSingleExo<SingleZone>(`/zones/${zoneId}`)