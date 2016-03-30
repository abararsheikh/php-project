export function getMenu() {
  console.log('getting menu');
  return $.get('/api/menu');
}

export function saveMenu(menu) {
  // const data = {menu: {name: 'test', menu: menu}};
  console.log('saving menu', menu);
  return $.post('/api/menu', {menu});
}