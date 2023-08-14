import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
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
    <div className="not-found-container">
      <img
        className="not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
