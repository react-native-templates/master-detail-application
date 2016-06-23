'use strict'

import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  RecyclerViewBackedScrollView
} from 'react-native'
import Subscribable from 'Subscribable'
import mixin from 'react-mixin'

import Cell from './cell'

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})

class Master extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(props.store.state().items)
    }
    this.onStoreChanged = this.onStoreChanged.bind(this)
  }

  componentDidMount() {
    this.addListenerOn(this.props.store.events, 'update', this.onStoreChanged)
  }

  onStoreChanged(){
    this.setState({
      dataSource: ds.cloneWithRows(this.props.store.state().items)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData)=><Cell item={rowData}
                                      onPress={
                                        ()=>this.props.navigator.push(
                                          { id: 'detail',
                                            title:'Detail',
                                            props:{ navEvents: this.props.navEvents,
                                                    item:rowData }}
                                        )
                                      }
                                      onDelete={()=>{
                                        this.props.store.remove(rowData)

                                      }}
                                    />}
          renderScrollComponent={(props) => <RecyclerViewBackedScrollView {...props} />}
        />
      </View>
    )
  }

}
mixin(Master.prototype, Subscribable.Mixin)

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    paddingLeft:15,
    paddingTop:64,
    flex: 1
  }
})

module.exports = Master
