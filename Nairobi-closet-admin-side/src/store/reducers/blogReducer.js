import {
  ADMIN_GET_BLOG,
  ADMIN_ADD_BLOG,
  ADMIN_UPDATE_BLOG,
  ADMIN_DELETE_BLOG,
} from '../constants/blogConstants'

export default function blogReducer(state = { blogs: [] }, action) {
  switch (action.type) {
    case ADMIN_GET_BLOG: {
      return {
        blogs: action.payload,
      }
    }

    case ADMIN_ADD_BLOG: {
      let blogs = [...state.blogs]
      blogs.unshift(action.payload)
      return {
        ...state,
        blogs: blogs,
      }
    }

    case ADMIN_UPDATE_BLOG: {
      let blogs = [...state.blogs]
      let index = blogs.findIndex((blog) => blog._id === action.payload._id)
      blogs[index] = action.payload
      return {
        ...state,
        blogs: blogs,
      }
    }

    case ADMIN_DELETE_BLOG: {
      let blogs = [...state.blogs]
      let index = blogs.findIndex((blog) => blog._id === action.payload)
      blogs.splice(index, 1)
      return {
        ...state,
        blogs: blogs,
      }
    }

    default: {
      return state
    }
  }
}
