

<h1 align="center">
  🚩React Native Dropdown Select List
</h1>

<div align="center">

🟢 React Native Select List Equivalent to Html's Select with options --"

</div>

<p align="center" >
  <kbd>
    <img
      src="https://i.imgur.com/JM9fFbH.gif"
      title="List Demo"
    >
  </kbd>
  <br>
  <em>React Native Dropdown Select List Demo.</em>
</p>

<h4>Light weight and <b>Easy</b> to use dropdown select list.</h4>

-   Style it your way with style props of every view.
-   Smooth performance on all platforms IOS, Android and Web.
-   Change Font Family Easily which community picker lacks.
-   Zero dependencies

# Compatibility

|  iOS  | Android | Web | Expo |
--------|---------|-----|------|
|  ✅  |    ✅    | ✅ |  ✅  |


# 🔌 Installation

```sh
$ npm install react-native-dropdown-select-list

```

OR

```sh
$ yarn add react-native-dropdown-select-list
```


# 😎 Usage
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

# ⭐ Props
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

# ▶️ Watch Video

[![Watch the video](https://i.imgur.com/K8Lt2h4.png)](https://www.youtube.com/watch?v=J9raEY-1KPQ&t=499s)

# 💲 Would you like to support me?

If you would like me come up with similar packages, buy me a cup of coffee to boost my energy.
<br><br>
[![Paypal](https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png)](https://paypal.me/danishamindar)