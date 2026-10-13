export const cookieStorageKey = "workplace-cravings-cookie-choice";

export const cookieCategories = [
  {
    id: "essential",
    name: "Strictly necessary",
    description:
      "Remembers the choice you make on this banner so we do not ask on every visit. The site cannot switch this off.",
    required: true,
  },
  {
    id: "preferences",
    name: "Preferences",
    description:
      "Reserved for optional settings, such as a saved display choice. We do not use this category today.",
    required: false,
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Would allow measurement of how the site is used. We do not run analytics cookies today. If we add them later, they will stay off until you opt in.",
    required: false,
  },
] as const;

export type CookieCategoryId = (typeof cookieCategories)[number]["id"];

export type CookieChoice = {
  essential: true;
  preferences: boolean;
  analytics: boolean;
  updatedAt: string;
};

export const defaultCookieChoice: CookieChoice = {
  essential: true,
  preferences: false,
  analytics: false,
  updatedAt: "",
};
