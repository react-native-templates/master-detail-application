/**
 * Sample Master Detail React Native App
 * https://github.com/react-native-templates/master-detail-application
 * @flow
 */

import React from 'react'
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import store from './store'
import Emitter from 'EventEmitter'
const navEvents = new Emitter()

import Master from './master'
import Detail from './detail'

class MasterDetailApplication extends React.Component {
  render () {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ id: 'master', title: 'Items', props: { navEvents } }}
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

  navigatorRenderScene (route, navigator) {
    switch (route.id) {
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

const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    if (index === 0) {
      return null
    }
    var previousRoute = navState.routeStack[index - 1]
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    )
  },

  RightButton (route, navigator, index, navState) {
    switch (route.id) {
      case 'master':
        return (
          <TouchableOpacity
            onPress={() => navigator.push({id: 'detail', title:'New', props:{ navEvents }}) }
            style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Add
            </Text>
          </TouchableOpacity>
        )
      case 'detail':
        if (route.props.item) {
          return <View/>
        }
        return (
          <TouchableOpacity
            onPress={() => route.props.navEvents.emit('save')}
            style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Save
            </Text>
          </TouchableOpacity>
        )
    }
  },

  Title (route, navigator, index, navState) {
    return <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white'
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    color: '#000',
    fontWeight: '500',
    marginVertical: 9,
    marginRight: 10,
    marginLeft: 10
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: '#4F8EF7'
  }
})

AppRegistry.registerComponent('MasterDetailApplication', () => MasterDetailApplication)
