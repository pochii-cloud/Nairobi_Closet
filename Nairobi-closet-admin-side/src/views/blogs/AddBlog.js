import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CRow,
  CButton,
  CImage,
  CSpinner,
} from '@coreui/react'
import { validateForm } from '../../utils/helper'
import SubmitButton from 'src/components/page/SubmitButton'
import { useNavigate, useMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import blogService from '../../services/admin/blogService'
import InputError from 'src/components/page/InputError'
import http from 'src/services/api'
import { UPLOAD_URL } from 'src/config'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

const AddBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState({ value: 'active', label: 'active' })
  const [submitting, setSubmitting] = useState(false)
  const [update, setUpdate] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [id, setId] = useState('')
  const blogs = useSelector((state) => state.blogReducer.blogs)
  const match = useMatch('/blog/:id/edit')
  const initialFormErrors = {
    title: '',
    description: '',
    status: '',
    author: '',
  }
  const [errors, setErrors] = useState(initialFormErrors)
  const validateInputs = () => {
    const err = { ...errors }

    err.title = !title ? 'Title field is required' : ''
    err.description = description
      ? description.length < 2
        ? 'Description must be at least 2 characters.'
        : description.length > 300
        ? 'Description must be maximum of 300 characters.'
        : ''
      : ''
    err.status = !status ? 'Please choose a status.' : ''
    err.author = !author ? 'Author field is required' : ''
    setErrors({ ...err })
    return validateForm(err)
  }

  useEffect(() => {
    if (match) {
      setUpdate(true)
      setId(match.params.id)
    }
  }, [match])

  useEffect(() => {
    async function fetchBlogs() {
      try {
        await blogService.getBlogs(dispatch)
      } catch (error) {
        console.error(error)
      }
    }

    if (update) {
      if (!blogs || blogs.length === 0) {
        fetchBlogs()
      }
      const blog = blogs.find((blog) => blog._id.toString() === id)

      if (category) {
        setTitle(blog.title)
        setDescription(blog.description)
        setImage(blog.image)
        setAuthor(blog.author)
        setStatus({
          value: category.status,
          label: category.status,
        })
      }
    }
  }, [dispatch, blogs, update, id])

  const uploadBlogImage = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
      let res = await http.post('/api/v1/admin/blog/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.status) {
        const { url } = res.data
        setImage(url)
      }
      setUploading(false)
    } catch (e) {
      console.error(e)
      toast.error(e.message, ToastObjects)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      setSubmitting(true)

      if (update) {
        try {
          let res = await blogService.updateBlog(
            id,
            {
              title,
              description,
              image,
              author,
              status: status.value,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/blogs')
          }
        } catch (error) {
          console.error(error)
          toast.error(error.message, ToastObjects)
        }
      } else {
        try {
          let res = await blogService.addBlog(
            {
              title,
              description,
              image,
              author,
              status: status.value,
            },
            dispatch,
          )
          if (res && res.status) {
            toast.success(res.message, ToastObjects)
            navigate('/blogs')
          }
        } catch (error) {
          console.error(error)
          toast.error(error.message, ToastObjects)
        }
      }
      setSubmitting(false)
    }
  }
  return (
    <div>
      <CRow className="justify-content-center">
        <CCol lg={12} sm={12}>
          <CCard>
            <CCardHeader>{update ? 'Update Blog' : 'Add Blog'}</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 need-validation" onSubmit={handleSubmit}>
                <CCol md={12}>
                  <CFormLabel htmlFor="title">
                    Title <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title name"
                    invalid={errors.title.length > 0}
                  />
                  {errors && errors.title.length > 0 && <InputError>{errors.title}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                    invalid={errors.description.length > 0}
                  />
                  {errors.description.length > 0 && <InputError>{errors.description}</InputError>}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="author">
                    Author <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    invalid={errors.author.length > 0}
                  />
                  {errors && errors.author.length > 0 && <InputError>{errors.author}</InputError>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="image">Blog Image</CFormLabel>
                  <CFormInput type="file" onChange={uploadBlogImage} />
                </CCol>
                {uploading ? (
                  <CCol md={6}>
                    <CSpinner color="info" />
                  </CCol>
                ) : null}

                {image ? (
                  <>
                    <CCol md={6}>
                      <CFormLabel htmlFor="image_preview">Image Preview</CFormLabel>
                      <CImage
                        className="px-3 img-fluid"
                        src={UPLOAD_URL + image}
                        alt="Blog image"
                        height="150px"
                        width="150px"
                      />
                    </CCol>
                  </>
                ) : null}
                <CCol md={6}>
                  <CFormLabel htmlFor="status">
                    Status <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <Select
                    name="status"
                    invalid={errors.status.length > 0}
                    value={status}
                    options={['active', 'inactive'].map((item) => {
                      return {
                        value: item,
                        label: item,
                      }
                    })}
                    onChange={(option) => {
                      setStatus({
                        value: option.value,
                        label: option.value,
                      })
                    }}
                  />
                  {errors.status.length > 0 && <InputError>{errors.status}</InputError>}
                </CCol>

                <CCol md={12} className="d-flex">
                  <SubmitButton>
                    {submitting ? (
                      <>
                        <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                      </>
                    ) : (
                      `${update ? 'Update' : 'Save'} Blog`
                    )}
                  </SubmitButton>
                  <CButton
                    style={{ marginLeft: '10px' }}
                    type="button"
                    onClick={() => {
                      navigate('/Blogs')
                    }}
                    color="warning"
                  >
                    Back to list
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
export default AddBlog
