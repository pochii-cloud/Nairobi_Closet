import {
  ADMIN_GET_BLOG,
  ADMIN_ADD_BLOG,
  ADMIN_UPDATE_BLOG,
  ADMIN_DELETE_BLOG,
} from '../constants/blogConstants'

// ======================== ADMIN SLIDERS ACTION ===============================

export function getAdminBlogs(payload) {
  return { type: ADMIN_GET_BLOG, payload }
}

export function addAdminBlog(payload) {
  return { type: ADMIN_ADD_BLOG, payload }
}

export function updateAdminBlog(payload) {
  return { type: ADMIN_UPDATE_BLOG, payload }
}

export function deleteAdminBlog(payload) {
  return { type: ADMIN_DELETE_BLOG, payload }
}
