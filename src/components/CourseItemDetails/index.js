import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstant = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class CourseItemDetails extends Component {
  state = {course: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'Get',
    }
    const res = await fetch(url, options)
    if (res.ok === true) {
      const dat = await res.json()
      const updateCourse = {
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }
      this.setState({
        course: updateCourse,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  successView = () => {
    const {course} = this.state
    return (
      <div className="container">
        <div className="course-card">
          <img
            className="course-details-image"
            src={course.imageUrl}
            alt={course.name}
          />
          <div className="content-container">
            <h1 className="course-name">{course.name}</h1>
            <p className="course-description">{course.description}</p>
          </div>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-icon">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  finalRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.loadingView()
      case apiStatusConstant.success:
        return this.successView()
      case apiStatusConstant.fail:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link-el">
          <div className="logo-container">
            <img
              className="logo-image"
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </div>
        </Link>
        {this.finalRender()}
      </div>
    )
  }
}

export default CourseItemDetails
