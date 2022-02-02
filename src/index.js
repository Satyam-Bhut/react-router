import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Routes,Route,Navigate,Link,Outlet,useParams,NavLink,useNavigate,useLocation} from 'react-router-dom'


ReactDOM.render(
  <Router>
      <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/myapps' element={<Navigate replace to='/learn'/>} />
         
          <Route path='/learn' element={<Learn />} >
                   <Route path=':id' element={<Navigate replace to='/'/>}/>
                   <Route path='courses' element={<Courses/>} >
                            <Route path=':id' element={<CourseId />}/>
                   </Route>
                   <Route path='bundles' element={<Bundles/>} />
          </Route>
         <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
  </Router>,
  document.getElementById('root')
);

function CourseId(){

  const {id} = useParams();
  const navigate = useNavigate();
  return(
    <div>
      <h1>{`Your Url is ${id}`}</h1>
      <button onClick={()=>{
          navigate("/dashboard",{state: id}); // navigate can take first argument like -1 means 1 page backward but to specify path is better.
          //second argument is the information that to carry with new page.
          // it should be state not else.
          // the same thing can be done with the link itself
      }} className='btn btn-warning'>Price</button>

      <Link to="/dashboard" state={id}>Test</Link>
      
    </div>
  )
}

function Index(){
  return (
    <div>
      <h1>Index Route</h1>
    </div>
  )
}

function Learn(){
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed are here</h4>
      <Link className='btn btn-success' to='/learn/courses'>Courses</Link>
      {"   "}
      <Link className='btn btn-primary' to='/learn/bundles'>Bundle</Link>
      <Outlet />
    </div>
  )
}

function Courses(){
  const coursesList=['react','JS','Angular','Machine-Learning','EmbeddedMachineLearning'];
  const randomCourse = coursesList[Math.floor(Math.random()*coursesList.length)];
  return (
    <div>
      <h1>Courses List</h1>
      <h1>Courses Card</h1>
      <NavLink style={({isActive})=>{   //is active is default provided
        return{ backgroundColor:isActive?"rebeccapurple":"cyan"}
      }} 
      to={`/learn/courses/${randomCourse}`}>{randomCourse}</NavLink>

      <NavLink className='btn btn-dark' to={`/learn/courses/test`}>Test</NavLink>

      <Outlet />
    </div>
  )
}

function Bundles(){
  return (
    <div>
      <h1>Bundles List</h1>
      <h1>Bunldes Card</h1>
    </div>
  )
}

function Dashboard(){
    //to use the information that is carring from navigate we need to get help from the location hook.
    const location = useLocation();

    return (
      <div>
        <h1>Info that i got {location.state}</h1>
      </div>
    )
  }