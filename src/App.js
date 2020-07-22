import React from "react";
import { Component } from "react";
import Select from "react-select";
import Dropdown from "./CustomComponent/DropDown";
const countriesList = [
  { label: "India" },
  { label: "United Kingdom" },
  { label: "Japan" },
  { label: "United states of America" },
  { label: "South Africa" },
  { label: "Korea" },
  { label: "Kuwait" },
  { label: "Singapore" },
  { label: "Europe" },
  { label: "Canada" },
  { label: "UAE" }
];

const selectStyles = {
  control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" })
};

export default class App extends Component {
  state = {
    inputVal: "",
    isOpen: false,
    value: undefined,
    options: countriesList,
    loadMoreState: 5
  };
  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };
  onSelectChange = value => {
    this.toggleOpen();
    console.log(value.label + "Selected");
    this.setState({ value });
  };
  handleInputChange = e => {
    if (e !== "") this.setState({ loadMoreState: countriesList.length });
    if (e === "") this.setState({ loadMoreState: 5 });
    this.setState({ inputVal: e });
  };
  loadMore = () => {
    this.setState({
      loadMoreState: this.state.options.length
    });
  };

  //Add your search logic here.
  customFilter = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  addCountry = () => {
    countriesList.push({ label: this.state.inputVal });
    this.onSelectChange({ label: this.state.inputVal });
    this.setState({ options: countriesList, inputVal: "" });
  };
  render() {
    const { isOpen, loadMoreState, value, options, inputVal } = this.state;
    return (
      <Dropdown
        isOpen={true}
        onClose={this.toggleOpen}
        target={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
              border: "1px solid #000",
              padding: "5px",
              margin: "0 auto"
            }}
            onClick={this.toggleOpen}
          >
            <div
              isSelected={isOpen}
              style={{ background: "transparent", color: "#000 !important" }}
            >
              {value ? `Country: ${value.label}` : "Select a Location"}
            </div>
            <ChevronDown
              style={{ position: "absolute", right: "0px", display: "flex" }}
            />
          </div>
        }
      >
        <div
          style={{
            width: "50%",
            border: "1px solid #000",
            padding: "5px",
            marginTop: "-1px",
            paddingBottom: "20px",
            margin: "0 auto"
          }}
        >
          <Select
            noOptionsMessage={() => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#000"
                  }}
                >
                  <div>{`"${inputVal}" not Found..`}</div>
                  <input
                    type="button"
                    style={{
                      border: "1px solid #000",
                      padding: "5px",
                      borderRadius: "5px"
                    }}
                    value="Add & Select"
                    onClick={this.addCountry}
                  />
                </div>
              );
            }}
            onChange={this.onSelectChange}
            onInputChange={this.handleInputChange.bind(this)}
            autoFocus
            isClearable={true}
            backspaceRemovesValue={false}
            components={{ DropdownIndicator, IndicatorSeparator: null }}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            menuIsOpen
            options={options.slice(0, loadMoreState)}
            placeholder="Search..."
            styles={selectStyles}
            tabSelectsValue={false}
            value={this.state.inputVal}
            filterOption={this.customFilter}
          />
          {loadMoreState !== options.length && (
            <div
              style={{ float: "right", fontWeight: "bold", cursor: "pointer" }}
              onClick={this.loadMore}
            >
              {options.length - 5 + "More..."}
            </div>
          )}
        </div>
      </Dropdown>
    );
  }
}

const Svg = p => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);
const DropdownIndicator = () => (
  <div css={{ color: "#000", height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);
