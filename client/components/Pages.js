import Pagination from 'react-bootstrap/Pagination'

const Pages = ({total, currentPage, selectPage}) => {
  const isLarge = total > 5;
  let list = [];

  for (var i = 1; i <= total; i++) {
    list.push(i);
  }
  if (isLarge) {
    if (currentPage > 2 && currentPage < total - 2) {
      list = list.slice(currentPage - 3, currentPage + 2);
    } else if (currentPage > total - 3) {
      list = list.slice(total - 5, total);
    } else {
      list = list.slice(0, 5);
    }
  }
  return (
    <Pagination>
      {isLarge && <Pagination.First onClick={() => selectPage(1)}  />}
      <Pagination.Prev onClick={() => currentPage > 1 && selectPage(currentPage-1)} />
      {isLarge && <Pagination.Ellipsis />}
      {list.map((item, index) => 
        <Pagination.Item key={item.toString()} active={item === currentPage} onClick={() => selectPage(item)}>{item}</Pagination.Item>
      )}
      {isLarge && <Pagination.Ellipsis />}
      <Pagination.Next onClick={() => currentPage < total && selectPage(currentPage+1)}  />
      {isLarge && <Pagination.Last  onClick={() => selectPage(total)}  />}
    </Pagination>
  )
}

export default Pages
