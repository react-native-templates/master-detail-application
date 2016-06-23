'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

import mixin from 'react-mixin'
import Subscribable from 'Subscribable'


class Detail extends Component {
  constructor(props){
    super(props)
    this.onSave = this.onSave.bind(this)
  }
  componentDidMount() {
    this.addListenerOn(this.props.navEvents, 'save', this.onSave)
  }
  onSave(){
     this.props.store.add(new Date().toLocaleTimeString())
     this.props.navigator.pop()
  }
  render(){
    return <View style={styles.container}><Text>{this.props.item || new Date().toString()}</Text></View>
  }
}
mixin(Detail.prototype, Subscribable.Mixin)

const styles = StyleSheet.create({
  container: {
    paddingTop:64,
    backgroundColor:'white',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  }
})

export default Detail

