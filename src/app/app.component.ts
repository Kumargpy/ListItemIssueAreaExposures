import { Component, OnInit } from '@angular/core';

interface FlatItem {
  depth: number
  text: string
  type: string
}

interface Item {
  text: string
  children: Item[],
  type: string
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';

  data = [
    {
      "type": "ordered-list-item",
      "depth": 1,
      "text": "ordered Item One",
    },
    {
      "type": "ordered-list-item",
      "depth": 1,
      "text": "ordered Item Two",
    },
    {
      "type": "ordered-list-item",
      "depth": 1,
      "text": "ordered Item three",
    },
    {
      "type": "unordered-list-item",
      "depth": 2,
      "text": "UnOrdered Item A",
    },
    {
      "type": "unordered-list-item",
      "depth": 2,
      "text": "UNOrdered Item B",
    }
  ];
  nested = this.unflatten(this.data);

  ngOnInit() {
    let dummyData = `{"text":"root","children":[{"text":"ordered Item One","children":[{"text":"ordered child A","children":[],"type":"ordered-list-item"},{"text":"rrdered child B","children":[],"type":"ordered-list-item"}],"type":"ordered-list-item","childrenType":"ordered-list-item"},{"text":"ordered Item Two","children":[],"type":"ordered-list-item","childrenType":"ordered-list-item"},{"text":"ordered Item three","children":[{"text":"UnOrdered Item A","children":[],"type":"unordered-list-item"},{"text":"UNOrdered Item B","children":[],"type":"unordered-list-item"}],"type":"ordered-list-item","childrenType":"unordered-list-item"}],"type":"ordered-list-item"}`

    this.nested = JSON.parse(dummyData)
    console.log(`dummy data`, this.nested);

  }


  unflatten(flatItems: FlatItem[]): Item {
    const root: Item = { text: 'root', children: [], type: this.data[0].type }
    const stack: Item[] = []

    const firstChildOfRoot = {
      text: flatItems[0].text,
      children: [],
      type: flatItems[0].type
    }
    root.children.push(firstChildOfRoot)
    stack.push(root)
    stack.push(firstChildOfRoot)

    for (let i = 1; i < flatItems.length; i++) {
      const flatItem = flatItems[i]
      const depthDiff = flatItem.depth - (stack.length - 1)
      if (depthDiff <= 0) {
        this.removeFromEnd(stack, -depthDiff + 1)
      }
      const stackTop = stack[stack.length - 1]
      const newEl = {
        text: flatItem.text,
        children: [],
        type: flatItem.type
      }
      stackTop.children.push(newEl)
      stack.push(newEl)
    }

    return root
  }

  removeFromEnd<T>(array: T[], count: number) {
    array.splice(array.length - count, count)
  }
}
