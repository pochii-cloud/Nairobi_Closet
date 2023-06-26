import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTooltip, CButton, CImage } from '@coreui/react'
import { Badge } from 'react-bootstrap'
import { cilPencil, cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import blogService from 'src/services/admin/blogService'
import { toast } from 'react-toastify'
import { ToastObjects } from '../../utils/toast/toastObject'
import { UPLOAD_URL } from '../../config'
const Blogs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogReducer.blogs)

  useEffect(() => {
    try {
      blogService.getBlogs(dispatch)
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  async function deleteBlog(id) {
    let message = window.confirm('Are you sure you want to delete?')
    if (message) {
      try {
        let res = await blogService.deleteBlog(id, dispatch)
        console.log(res)
        if (res && res.status) {
          toast.success(res.message, ToastObjects)
        }
      } catch (error) {
        toast.error(error.message, ToastObjects)
        console.error(error)
      }
    }
  }

  const columns = useMemo((clickHandler) => [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Author',
      selector: (row) => row.author,
      sortable: true,
    },

    {
      name: 'Image',
      selector: (row) =>
        row && row.image ? (
          <CImage alt="blog image" className="img-fluid p-3" src={UPLOAD_URL + row.image} />
        ) : (
          '-'
        ),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <Badge bg={`${row.status === 'active' ? 'success' : 'warning'}`}>{row.status}</Badge>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <CTooltip content="Edit" placement="top">
            <CButton
              onClick={() => {
                navigate(`/blog/${row.id}/edit`)
              }}
              color="info"
              className="addItemBtn mr-2"
              style={{ float: 'right', marginRight: '10px' }}
            >
              <CIcon icon={cilPencil} size="sm" />
            </CButton>
          </CTooltip>
          <CTooltip content="Delete" placement="top">
            <CButton
              onClick={() => deleteBlog(row.id)}
              color="danger"
              className="addItemBtn"
              style={{ float: 'right' }}
            >
              <CIcon icon={cilTrash} size="sm" />
            </CButton>
          </CTooltip>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ])

  const data = blogs.map((blog) => {
    console.log(blog)
    return {
      id: blog._id,
      title: blog.title,
      description: blog.description ? blog.description : '-',
      author: blog.author,
      image: blog.image,
      status: blog.status,
    }
   
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="tableHeaderBar">
              <div>
                Blog List
                <CTooltip content="Add Blog" placement="top">
                  <CButton
                    onClick={() => {
                      navigate('/blog/add')
                    }}
                    color="warning"
                    className="addItemBtn"
                    style={{ float: 'right' }}
                  >
                    <CIcon icon={cilPlus} size="sm" /> Add Blog
                  </CButton>
                </CTooltip>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <DataTable columns={columns} data={data} pagination />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Blogs
