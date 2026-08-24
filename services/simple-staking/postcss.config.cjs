// Tailwind v4 ships its own PostCSS plugin, which subsumes what this file used
// to list separately: `@import` inlining (was postcss-import), nesting (was
// tailwindcss/nesting) and vendor prefixing (was autoprefixer).
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
