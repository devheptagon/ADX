import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {searchBySectorLocation, deleteAdvert, selectAdvert} from 'redux/actions/advert'
import {getUsers} from 'redux/actions/user'
import Table from 'react-bootstrap/Table'
import Pages from './Pages'

const per_page = 10;

const UserList = ({className, onEdit}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.users);
  const [page, setPage] = useState(1);
  const firstIndex = per_page * (page - 1);

  console.log('user list', data);

  //Edit advert
  //@id = advert id
  //@title = advert title
  const onEditHandler = (id, user) => {
    const response = confirm(`Do you want to edit ${user}?`);
    if(response){
      onEdit(id);
      dispatch(selectAdvert(id));
      console.log(id + ' user edited');
    }
  };
  
  //Delete advert
  //@id = advert id
  const onDeleteHandler = id => {
    const response = confirm(`Do you want to delete ${id} numbered user`);
    if(response){
      dispatch(deleteAdvert(id));
      dispatch(searchBySectorLocation({page: page, per_page: per_page}));
      console.log(id + ' user deleted');
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [page]);
  
  return(
    <div  className={`${className} d-flex  flex-column`}>
      <Table className="d-flex flex-column" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>{/* Id */}
            <th>Name Surname</th>{/* Title */}
            <th>Email</th>{/* Email */}
            <th>Role</th>{/* Role */}
            <th></th>{/* Edit */}
            <th></th>{/* Delete */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index)=>
            <tr key={item.userID.toString() + index}>
              <td>{firstIndex + index + 1}</td>
              <td>{item.firstName + ' ' + item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td><a onClick={() => onEditHandler(item.advertID, item.title)}>Edit</a></td>
              <td><a onClick={() => onDeleteHandler(item.advertID)}>Delete</a></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pages total={data?.totalPage} currentPage={page} selectPage={_page => setPage(_page)} />
      <style jsx>{`
        tr{
          display: flex;
          flex-direction: row;
        }
        th, td {
          display: flex;
          flex: 0.2;
          align-items: center;
          justify-content: center;
        }
        th:nth-of-type(1),
        td:nth-of-type(1) {
          flex: 0.05;
        }
        th:nth-of-type(2),
        td:nth-of-type(2),
        th:nth-of-type(3),
        td:nth-of-type(3) {
          justify-content: flex-start;
          flex: 0.75;
        }
        a:hover{
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default UserList;