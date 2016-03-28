export function getMenu() {
  console.log('getting menu');
  return $.get('/api/menu');
}

export function saveMenu(menu) {
  console.log('saving menu');
  return $.post('/api/menu', menu);
}