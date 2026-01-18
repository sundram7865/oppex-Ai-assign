import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest with the standard Jest-DOM matchers
expect.extend(matchers);

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});