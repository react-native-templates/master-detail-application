/**
 * Sample Master Detail React Native App
 * https://github.com/react-native-templates/master-detail-application
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  View
} from 'react-native';

import mixin from 'react-mixin'

import Store from './store'
import Emitter from 'EventEmitter'

var navEvents = new Emitter()

var _navigator

const store = new Store()


import Subscribable from 'Subscribable'

class Master extends Component{
  constructor(props){
    super(props)
    this.state = store.state()
    this.onStoreChanged = this.onStoreChanged.bind(this)
  }
  componentDidMount() {
    this.addListenerOn(store.events, 'update', this.onStoreChanged)
  }
  onStoreChanged(){
    this.setState(store.state())
  }
  render(){
    return <View style={{flex:1, paddingTop:100}}>
      <Text>Items {this.state.items.length}</Text>
    </View>

  }
}
mixin(Master.prototype, Subscribable.Mixin)

class Detail extends Component {
  constructor(props){
    super(props)
    this.onSave = this.onSave.bind(this)
  }
  componentDidMount() {
    this.addListenerOn(this.props.navEvents, 'save', this.onSave)
  }
  onSave(){
     store.add("item")
     this.props.navigator.pop()
  }
  render(){
    return <View><Text>hello</Text></View>
  }
}
mixin(Detail.prototype, Subscribable.Mixin)

class MasterDetailApplication extends React.Component {
  render(){
    return(
      <Navigator
        style={styles.container}
        initialRoute={{id:'master', title: "Items", props:{ navEvents }}}
        renderScene={this.navigatorRenderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
        />
    )
  }
  navigatorRenderScene(route, navigator){
     _navigator = navigator
     switch(route.id){
       case 'master':
         return <Master navigator={navigator}
                        store={store}
                        {...route.props}
                        />
       case 'detail':
         return <Detail navigator={navigator}
                        store={store}
                        {...route.props}
                        />
     }
  }
}


var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    var previousRoute = navState.routeStack[index - 1];
    return (

      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
     switch(route.id){
       case 'master':
          return (
            <TouchableOpacity
              onPress={() => navigator.push({id: 'detail', title:"New", props:{ navEvents }}) }
              style={styles.navBarRightButton}>
              <Text style={[styles.navBarText, styles.navBarButtonText]}>
                Add
              </Text>
            </TouchableOpacity>
          )
       case 'detail':
          return (
            <TouchableOpacity
              onPress={() => route.props.navEvents.emit("save") }
              style={styles.navBarRightButton}>
              <Text style={[styles.navBarText, styles.navBarButtonText]}>
                Save
              </Text>
            </TouchableOpacity>
          )
     }
  },
  Title: function(route, navigator, index, navState) {
    return <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
  },
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: "#000",
    fontWeight: '500',
    marginVertical: 9,
    marginRight: 10,
    marginLeft: 10,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: "#000",
  },
})
AppRegistry.registerComponent('MasterDetailApplication', () => MasterDetailApplication);
