import api from '../lib/api.js'

export function fetchPosts() {
  return api.get('/posts/get-posts')
}

export function fetchComments(postId) {
  return api.get(`/posts/get-comments/${postId}`)
}

export function createPost({ content, category }) {
  return api.post('/posts/create-post', { content, category })
}

export function togglePostLike(postId) {
  return api.post(`/posts/like-post/${postId}`)
}

export function addPostComment(postId, text) {
  return api.post(`/posts/add-comment/${postId}`, { text })
}
