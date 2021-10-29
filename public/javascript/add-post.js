async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const description = document.querySelector('#post-description').value;

  const response = await fetch(`/api/posts`, {
    method: 'post',
    body: JSON.stringify({
      title,
      description
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Please provide information for your post');
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
