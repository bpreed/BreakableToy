import React, { Component } from 'react';
import  MultiSelectReact  from 'multi-select-react';

// Renders multi-select field with options specified

class MultiSelectTile extends Component {
  constructor() {
        super();
    }

  optionClicked(optionsList) {
    let selectedItems = []
    optionsList.forEach(item => {
      if (item.value) {
        selectedItems.push(item.id)
      }
    });
    if (optionsList.length == 15) {
      this.props.onSelect({types: selectedItems})
    } else if (optionsList.length == 52) {
      this.props.onSelect({states: selectedItems})
    }
  }

  render() {
    const selectedOptionsStyles = {
        color: "#3c763d",
        backgroundColor: "#dff0d8"
    };

    const optionsListStyles = {
        backgroundColor: "#fcf8e3",
        color: "#8a6d3b"
    };

    return (
      <MultiSelectReact
      options={this.props.optionsList}
      optionClicked={this.optionClicked.bind(this)}
      selectedBadgeClicked={this.optionClicked.bind(this)}
      selectedOptionsStyles={selectedOptionsStyles}
      optionsListStyles={optionsListStyles} />
    );
  }
}

export default MultiSelectTile
