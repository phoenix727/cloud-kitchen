import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      server: 'localhost:4000',
      orders: {},
      filterMin: 0,
      filterMax: 1000000
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.server);
    socket.on('order_event', (data) => {
      data.forEach((orderData) => {
        const orders = this.state.orders;
        if (!orders[orderData.id]) {
          orders[orderData.id] = orderData;
          this.setState({ orders })
        } else {
          orders[orderData.id].event_name = orderData.event_name;
          this.setState({ orders })
        }
      })
    })
  }

  render() {
    const orders = this.state.orders;
    const filteredOrders = Object.values(orders)
      .filter((ord) => {
        return ord.price > this.state.filterMin && ord.price < this.state.filterMax
      })
    return (
      <div className="App">
      <div className="filter-wrapper">
          <input
            name="filterMin"
            type="number"
            placeholder="Min"
            onInput={(e) => this.setState({ filterMin: e.target.value })}
            value={this.state.filterMin}>
          </input>
          <input
            name="filterMin"
            type="number"
            placeholder="Max"
            onInput={(e) => this.setState({ filterMax: e.target.value })}
            value={this.state.filterMax}>
          </input>
      </div>
      <div>
        Showing {filteredOrders.length} of {Object.keys(orders).length} orders
      </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredOrders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.item}</td>
                      <td>{order.price}</td>
                      <td>{order.event_name}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

export default App;
