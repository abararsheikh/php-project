export function getMenu() {
  console.log('getting menu');
  return $.get('/api/menu');
}