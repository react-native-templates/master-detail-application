'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

export default (props)=>{
  return <TouchableOpacity style={styles.sep} onPress={props.onPress}>
    <View style={{flexDirection:'row'}}>
        <View style={styles.content}>
          <Text style={styles.text}>{props.item}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={props.onDelete}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
    </View>
  </TouchableOpacity>
}

var styles = StyleSheet.create({
  sep: {
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  actionText:{
    color:'#4F8EF7'
  },
  text: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5,
  },
  content:{
    flexDirection:'row',
    flex:1,
  }
})
