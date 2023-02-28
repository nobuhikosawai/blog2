const THEME_KEY = 'dark-mode-toggle';

/**
 * Get theme
 * @return {'dark' | 'light'}
 */
function getTheme() {
  const theme = localStorage.getItem(THEME_KEY);

  return (
    theme ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
  );
}

/**
 * Apply preference
 * @param {'dark' | 'light'}
 */
function setPreference(theme) {
  const html = document.documentElement;
  // html.classList.add(theme);
  html.dataset.theme = theme; //['data-theme'] = theme;

  const button = document.getElementById('theme-toggle');
  button?.setAttribute('aria-label', theme);
  if (theme === 'dark') {
    button?.classList.add('theme-toggle--toggled');
  } else {
    button?.classList.remove('theme-toggle--toggled');
  }
}

/**
 * Save preference on localStorage
 * @param {'dark' | 'light'}
 */
function savePreference(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

// Calling this as fast as possible to avoid the flash
// https://web.dev/building-a-theme-switch-component/#javascript
// https://github.com/donavon/use-dark-mode/blob/develop/README.md#that-flash
setPreference(getTheme());

window.onload = () => {
  const theme = getTheme();
  setPreference(getTheme());

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const t = getTheme() === 'dark' ? 'light' : 'dark';
    savePreference(t);
    setPreference(t);
  });
};

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    const theme = event.matches ? 'dark' : 'light';
    setPreference(theme);
  });
