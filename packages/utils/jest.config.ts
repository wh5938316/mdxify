import { config } from "@mdxify/jest-config/react/jest-preset";

export default {
  ...config,
  moduleNameMapper: {
    "^@search-studio/(.*)$": "<rootDir>/src/$1",
  },
};
