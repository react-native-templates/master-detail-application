'use strict'

import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RecyclerViewBackedScrollView
} from 'react-native'
import Subscribable from 'Subscribable'
import mixin from 'react-mixin'

//import Cell from './cell'
import store from './store'

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})

class Master extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(store.state().items)
    }
    this.onStoreChanged = this.onStoreChanged.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    this.addListenerOn(store.events, 'update', this.onStoreChanged)
  }

  onStoreChanged(){
    this.setState({
      dataSource: ds.cloneWithRows(store.state().items)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderScrollComponent={(props) => <RecyclerViewBackedScrollView {...props} />}
        />
      </View>
    )
  }

  renderRow (rowData, sectionID, rowID) {
    //TODO fix this
    return (
      <TouchableOpacity onPress={()=>this.props.navigator.push(
          {id: 'detail', title:'Detail', props:{ navEvents: this.props.navEvents, item:rowData }}
      )}>
        <View style={{flexDirection:'row'}}>
            <Text>{rowData}</Text>
            <TouchableOpacity onPress={()=>store.remove(rowData)}>
              <Text>Delete</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}
mixin(Master.prototype, Subscribable.Mixin)

var styles = StyleSheet.create({
  container: {
    paddingTop:64,
    flex: 1
  }
})

module.exports = Master
