'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

class Cell extends Component {
  render () {
    // gets props text, sectionID, rowID, onPress(), highlightRow()
    return <View style={{ backgroundColor: 'blue' }}/>
    <TouchableHighlight onPress={() => {
      this.props.onPress(this.props.rowID);
      this.props.highlightRow(this.props.sectionID, this.props.rowID);
    }}>
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  }
}

module.exports = Cell
