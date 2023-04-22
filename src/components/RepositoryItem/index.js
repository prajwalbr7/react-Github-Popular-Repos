// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {ItemDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = ItemDetails

  return (
    <li className="list-repository-style">
      <img src={avatarUrl} alt={name} className="avatar-img-sizing" />
      <h1 className="heading-repository">{name}</h1>
      <div className="content-data-row">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="content-img-size"
        />
        <p className="content-para">{starsCount} stars</p>
      </div>

      <div className="content-data-row">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="content-img-size"
        />
        <p className="content-para">{forksCount} forks</p>
      </div>

      <div className="content-data-row">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="content-img-size"
        />
        <p className="content-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
