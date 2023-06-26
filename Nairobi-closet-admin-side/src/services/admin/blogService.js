import {
  addAdminBlog,
  getAdminBlogs,
  updateAdminBlog,
  deleteAdminBlog,
} from 'src/store/actions/blogActions'
import http from '../api'

let blogService = {
  getBlogs: async (dispatch) => {
    try {
      const res = await http.get('/api/v1/admin/blogs')
      dispatch(getAdminBlogs(res.data)) // Update the payload to res.data.blogs
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  addBlog: async (data, dispatch) => {
    try {
      const res = await http.post('/api/v1/admin/blog', data)
      dispatch(addAdminBlog(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  updateBlog: async (id, data, dispatch) => {
    try {
      const res = await http.patch(`/api/v1/admin/blog/${id}`, data)
      dispatch(updateAdminBlog(res.data))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  deleteBlog: async (id, dispatch) => {
    try {
      const res = await http.delete(`/api/v1/admin/blog/${id}`)
      dispatch(deleteAdminBlog(id, dispatch))
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

export default blogService
