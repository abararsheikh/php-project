export function update(id, content, link = '') {
  return $.ajax({
    url: `/api/page/${id}`,
    method: 'PUT',
    data: {content, link}
  })
}

export function add(content, link = '') {
  return $.post('/api/page', {content, link})
}

export function get(id) {
  if (id) return $.get(`/api/page/${id}`);

  return $.get(`/api/page/5`);

}