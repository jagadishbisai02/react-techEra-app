import {Link} from 'react-router-dom'
import './index.css'

const Item = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <li>
      <Link to={`/courses/${id}`} className="link">
        <div className="course-list-items">
          <img className="course-image" src={logoUrl} alt={name} />
          <p className="course-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default Item
