'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

class Detail extends Component {
  render () {
    return (
      <View style={styles.container}/>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'magenta',
    flex: 1
  }
})

module.exports = Detail

