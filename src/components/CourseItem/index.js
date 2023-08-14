import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Item from '../Item'
import './index.css'

const apiStatusConstant = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class CourseItem extends Component {
  state = {apiStatus: apiStatusConstant.initial, courseList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const url = ' https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        courseList: formatData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.fail})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-icon">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {courseList} = this.state
    return (
      <div className="course-item-lists">
        <h1 className="header">Courses</h1>
        <ul className="course-item">
          {courseList.map(item => (
            <Item details={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

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
      case apiStatusConstant.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link">
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

export default CourseItem
