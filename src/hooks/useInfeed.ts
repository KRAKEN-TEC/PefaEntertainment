import useExo, { InFeed } from "./useExo";


export const useInfeed = () => useExo<InFeed>("/zones");