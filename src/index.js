import { BehaviorSubject, fromEvent, Subject } from 'rxjs'

// Emitter iterator.
let i = 0

// Hood for main site content.
const content = document.getElementById('content')

// Global subject.
const subject = new BehaviorSubject('first-value')

// Add 12 elements to the document.
for (let i = 0; i < 12; i++) {
  // Create new element.
  const node = document.createElement('div')
  node.setAttribute('class', 'col-lg-3 item inactive')
  node.setAttribute('id', `item-${i}`)

  // Add click event listener to the element.
  const itemObs = fromEvent(node, 'click').subscribe(event => {
    const itemId = event.target.id
    const item = document.getElementById(itemId)

    item.classList.remove('inactive')
    item.classList.add('subscribed')
    item.appendChild(document.createTextNode('Subscribed'))

    // Subscribe to the subject and visualize activation.
    subject.subscribe(v => {
      console.log(`${itemId} got value: ${v}`)

      item.classList.remove('subscribed')
      item.classList.add('activated')

      setTimeout(() => {
        item.classList.remove('activated')
        item.classList.add('subscribed')
      }, 1000)
    })

    // Prevent further subscription for the element if already clicked.
    // Disable click event.
    itemObs.unsubscribe()
  })

  // Add element to the document.
  content.appendChild(node)
}

// Create emit button.
const node = document.createElement('div')
node.setAttribute('class', 'col-lg-6 item inactive')
node.appendChild(document.createTextNode('Click to emit'))

// Emit value when clicked.
node.addEventListener('click', event => {
  console.log(`Emitted ${i}`)
  subject.next(i)
  i++
})

// Add emit button to the document.
content.appendChild(node)
