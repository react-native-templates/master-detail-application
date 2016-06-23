'use strict';

import Emitter from 'EventEmitter'


export default class Store {
  constructor(){
    this.items = []
    this.events = new Emitter()
  }

  state(){
    return {
      items: this.items
    }
  }


  add(item){
    this.items = [...this.items, item]
    this.publish()
  }
  remove(item){
    this.items = this.items.filter(x=>x==item)
    this.publish()
  }

  publish(event, ...args){
    this.events.emit('update')
  }
}


