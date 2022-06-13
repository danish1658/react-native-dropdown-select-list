

<h1 align="center">
  🚩React Native Select List
</h1>

<div align="center">

☝️ React Native Select List Equivalent to Html's  Select with options --"

</div>

<p align="center" >
  <kbd>
    <img
      src="https://raw.githubusercontent.com/danish1658/react-native-dropdown-select-list/main/assets/images/demo.gif"
      title="List Demo"
    >
  </kbd>
  <br>
  <em>React Native Dropdown Select List Demo.</em>
</p>

Light weight and blazing fast dropdown menu picker.

-   Style it your way with style props of every view.
-   Smooth performance on all platforms IOS, Android and Web.
-   Change Font Family Easily which native picker lacks.
-   10 Seconds Setup

# Installation
```jsx
yarn add react-native-dropdown-select-list
```

# Usage
```jsx
import SelectList from 'react-native-dropdown-select-list'

const App = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [{key:'Jammu & Kashmir',value:'Jammu & Kashmir'}];

  return(
    <SelectList setSelected={setSelected} data={data} />
  )

};
```

For Live `Demo` [(Expo Snack)](https://snack.expo.dev/@danish1658/react-native-dropdown-select-list)

# Props
| Name | Type | Description |
| ---- | ---- | ----------- |
| placeholder | String | Placeholder text that will be displayed in the select box
| boxStyles| Object| Additional styles for select box
| inputStyles| Object| Additional styles for text of select box
| dropdownStyles| Object| Additional styles for dropdown scrollview
| dropdownItemStyles| Object| Additional styles for dropdown list item
| dropdownTextStyles| Object| Additional styles for list items text
| maxHeight| Number | Maximum height of the dropdown wrapper to occupy
| data| array[object]| Data which will be iterated as options of select list
| setSelected| String | Selected option value which will be stored in your local state

# Watch Video
[![Watch the video](https://i.imgur.com/9CVX16L.png)](https://www.youtube.com/watch?v=J9raEY-1KPQ&t=499s)
