'use strict'

import React, { Component } from 'react'
import {
  View,
  ListView,
  StyleSheet,
  RecyclerViewBackedScrollView
} from 'react-native'
import Cell from './cell'
import store from './store'

class Master extends Component {
  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
  }

  componentWillMount () {
    this.fetchData()
  }

  fetchData () {
    fetch('https://restcountries.eu/rest/v1/all')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json),
          loaded: true
        })
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={(props) => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeperator}
        />
      </View>
    )
  }

  _renderRow (rowData, sectionID, rowID) {
    return (
      <Cell
        text=rowData.name
        onPress=this._onPress.bind(this)
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'magenta',
    flex: 1
  }
})

module.exports = Master
