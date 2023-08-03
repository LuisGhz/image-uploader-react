/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { cleanup } from '@testing-library/react';
import { afterEach, expect } from "vitest";
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() =>  cleanup());


