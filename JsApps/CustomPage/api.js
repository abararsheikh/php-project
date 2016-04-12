export function update(id, content) {
  return $.ajax({
    url: `/api/page/${id}`,
    method: 'PUT',
    data: {content, link: `/page/${id}`}
  })
}

export function add(content, link = '') {
  return $.post('/api/page', {content, link})
}

export function get(id) {
  if (id) return $.get(`/api/page/${id}`);

  return $.get(`/api/page/5`);

}