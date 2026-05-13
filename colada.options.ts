import type { PiniaColadaOptions } from '@pinia/colada';
import { PiniaColadaCachePersister } from '@pinia/colada-plugin-cache-persister';
import { PINIA_COLADA_CACHE_KEY } from './src/shared/api/base/colada';

const DEFAULT_STALE_TIME = 5_000;
const DEFAULT_GC_TIME = 300_000;

export default {
  plugins: [
    PiniaColadaCachePersister({
      key: PINIA_COLADA_CACHE_KEY,
      debounce: 1000,
    }),
  ],
  queryOptions: {
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  },
} satisfies PiniaColadaOptions;
