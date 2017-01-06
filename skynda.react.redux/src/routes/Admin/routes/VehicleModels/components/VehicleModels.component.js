/**
 * Created by jevgenir on 10/26/2016.
 */
import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import {browserHistory, Link} from "react-router"
import RaisedButton from "material-ui/RaisedButton";

export default class VehicleModels extends React.Component {
  static propTypes = {
    getList: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        modelCode: React.PropTypes.string,
        title: React.PropTypes.string
      }))
    })
  };

  componentDidMount() {
    this.props.getList();
  }

  render() {
    let rows = !this.props.data.isFetching ? this.props.data.items : [];
    const loading = this.props.data.isFetching ? "Fetching" : "Vehicle Models";

    return (<div className="container">
      <h3>{loading}</h3>

      <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/vehicle-model/new`)}/>

      <Table rowHeight={50} rowsCount={rows.length} width={1000} maxHeight={500} headerHeight={50}>
        <Column
          header={<Cell>#</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rowIndex+1}.</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>Id</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].modelCode}</Cell>)}
          width={200}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].title}</Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Actions</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              <RaisedButton label="Show" onClick={e => browserHistory.push(`/admin/vehicle-model/${rows[rowIndex].id}`)}/>
              <RaisedButton secondary={true} label="Delete" onClick={e => this.props.deleteItem(rows[rowIndex].id)}/>
            </Cell>
          )}
          width={200}
        />
      </Table>

    </div>)
  }
}