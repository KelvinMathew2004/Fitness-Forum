// import './Card.css'
import { Link } from 'react-router-dom'

const Card = (props) =>  {

  return (
      <div className={`Card color-${props.color}`}>
        <Link to={'details/'+ props.id} className="card-link">
            <h2 className="name">Name: <span className='stat'>{props.name}</span></h2>
            <h2 className="speed">Speed: <span className='stat'>{props.speed} mph</span></h2>
            <h2 className="color">Color: <span className='stat'>{props.color}</span></h2>
            <Link to={'/edit/'+ props.id}>
                <button>Edit Crewmate</button>
            </Link>
        </Link>
      </div>
  );
};

export default Card