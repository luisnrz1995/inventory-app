const toggleTheme = document.getElementById('toggle-theme');
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);
toggleTheme.checked = currentTheme === 'dark';

toggleTheme.addEventListener('change', function () {
  if (this.checked) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});