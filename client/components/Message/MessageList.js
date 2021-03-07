import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import {searchBySectorLocation, deleteAdvert, selectAdvert} from 'redux/actions/advert'
import {getMessages} from 'redux/actions/message'
import Table from 'react-bootstrap/Table'
import Pages from '../Pages'

const per_page = 10;

const MessageList = ({className, onEdit}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {data} = useSelector(state => state.messages);
  const [page, setPage] = useState(1);
  const firstIndex = per_page * (page - 1);

  //Reply Message
  //@id = message id
  const onReplyHandler = (id) => {
    onEdit(id);
    // dispatch(selectMessage(id));
    router.push(
      '/account/messages/[id]',
      `/account/messages/${id}`,
      { shallow: true }
    );
    console.log(id + ' message to reply');
  };
  
  //Delete Message
  //@id = message id
  const onDeleteHandler = id => {
    const response = confirm(`Do you want to delete ${id} numbered message`);
    if(response){
      dispatch(deleteAdvert(id));
      dispatch(searchBySectorLocation({page: page, per_page: per_page}));
      console.log(id + ' user deleted');
    }
  };

  useEffect(() => {
    dispatch(getMessages());
  }, [page]);
  
  return(
    <div  className={`${className} d-flex  flex-column`}>
      <Table className="d-flex flex-column" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>{/* Id */}
            <th>Name Surname</th>{/* Title */}
            <th>Email</th>{/* Email */}
            <th>Date</th>{/* Date */}
            <th></th>{/* Reply */}
            <th></th>{/* Delete */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index)=>
            <tr key={item.messageID.toString() + index}>
              <td>{firstIndex + index + 1}</td>
              <td>{item.fromFullName}</td>
              <td>{item.fromEmail}</td>
              <td>{item.updatedTime && new Date(item.updatedTime).toLocaleDateString()}</td>
              <td><a onClick={() => onReplyHandler(item.messageID)}>Reply</a></td>
              <td><a onClick={() => onDeleteHandler(item.messageID)}>Delete</a></td>
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

export default MessageList;