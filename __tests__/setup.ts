import fc from 'fast-check';
import { TESTS_SEED } from '~/shared/lib/constants';
import '@testing-library/jest-dom/vitest';

fc.configureGlobal({ seed: TESTS_SEED });
