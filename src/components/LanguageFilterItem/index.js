// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {Data, gettingTheId, isActive} = props
  const {id, language} = Data

  const getTheId = () => {
    gettingTheId(id)
  }
  const ColorChange = isActive ? 'border-style' : ''
  return (
    <li className="">
      <button
        className={`button-style-list ${ColorChange}`}
        type="button"
        onClick={getTheId}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
