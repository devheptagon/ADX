import {useState} from 'react'
import {AccountLeftPanel, AdvertList, Container, NewAdvert} from 'components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const Adverts = () => {
  const [key, setKey] = useState('advertList');
  const [isEdit, setIsEdit] = useState(false);
  const [editedAdvertID, setEditedAdvertID] = useState();
  const editHandler = (id) => {
    setIsEdit(true);
    setEditedAdvertID(id);
    setKey('editAdvert');
  }
  return (
    <Container>
      <main>
        <Row>
          <Col lg={3}>
            <AccountLeftPanel />
          </Col>
          <Col lg={9}>
            <Tabs
              id="tab"
              activeKey={key}
              onSelect={k => setKey(k)}
              className="my-3 mr-3 ml-0"
            >
              <Tab eventKey="newAdvert" title="New Advert">
                <NewAdvert className="my-3 mr-3 ml-0" />
              </Tab>
              <Tab eventKey="advertList" title="Advert List">
                <AdvertList className="my-3 mr-3 ml-0" onEdit={editHandler} />
              </Tab>
              {isEdit &&
                <Tab eventKey="editAdvert" title="Edit Advert">
                  <NewAdvert className="my-3 mr-3 ml-0" advertID={editedAdvertID} isEdit={true} />
                </Tab>
              }
            </Tabs>
          </Col>
        </Row>
      </main>
      <style jsx>{`
        main {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 0;
        }
        h2 {
          margin-top: 1rem;
          margin-left: 1rem;
        }
        span {
          font-size: 1.5rem;
        }
      `}</style>
    </Container>
  );
}

export default Adverts;