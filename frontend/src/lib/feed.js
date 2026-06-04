export function filterByCategory(posts, category) {
  if (!category || category === 'All') return posts
  return posts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase(),
  )
}

export function sortPosts(posts, sort) {
  const copy = [...posts]
  if (sort === 'new') {
    return copy.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )
  }
  if (sort === 'top' || sort === 'hot') {
    return copy.sort((a, b) => {
      const likesA = a.likes?.length ?? 0
      const likesB = b.likes?.length ?? 0
      if (likesB !== likesA) return likesB - likesA
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }
  return copy
}
