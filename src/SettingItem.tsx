import React, {Component, PureComponent} from 'react';
import {StyleSheet, StyleProp, ViewStyle, Switch} from "react-native";
import {Col, DialogUtils, RenderUtils, StyleUtils, TextCustom, Touchable, HTMLView, ComponentUpdateOnlyState} from "my-rn-base-component";
import {DialogSelectValue} from "./DialogSelectValue";

const s = StyleUtils.getAllStyle();

interface SettingListItemProps<T> { // obj T Cần có hàm toString để hiển thị trên các item của dialog
    listData: T[]
    selectedItem?: T
    getDescription: (selectedItem: T) => string
    selectedValueChange: (value: T) => void
}

interface SettingItemProps {
    icon?: any,
    hasSwitch?: boolean
    switchState?: () => Promise<boolean>
    switchOnValueChange?: (value: boolean) => void
    onPress?: (settingItem: SettingItem) => void
    hasNavArrow?: boolean
    title?: string
    des?: string
    // cho list item
    listItemSetting?: SettingListItemProps<any>
    style?: StyleProp<ViewStyle>
}

export class SettingItem extends ComponentUpdateOnlyState<SettingItemProps, { selectedItem: any, switchState: boolean, customDes?: string }> {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        let selectedItem;
        if (this.props.listItemSetting) {
            selectedItem = this.props.listItemSetting.selectedItem;
            if (selectedItem == null)
                selectedItem = this.props.listItemSetting.listData[0];
        }

        this.state = {switchState: false, selectedItem: selectedItem};
    }

    setCustomDes(des: string) {
        this.setState({customDes: des});
    }

    async componentDidMount() {
        if (this.props.hasSwitch) {
            let switchState = await this.props.switchState();
            this.setState({switchState: switchState})
        }
    }

    switchOnValueChange(value) {
        this.setState({switchState: value});
        this.props.switchOnValueChange && this.props.switchOnValueChange(value)
    }

    onPress() {
        if (this.props.onPress) {
            this.props.onPress(this);
            return
        }
        if (this.props.listItemSetting) {
            DialogUtils.showDialog(<DialogSelectValue listData={this.props.listItemSetting.listData}
                                                      selectedValue={this.state.selectedItem}
                                                      selectedCallback={(selectedValue) => {
                                                          if (this.state.selectedItem === selectedValue)
                                                              return;
                                                          this.setState({selectedItem: selectedValue});
                                                          this.props.listItemSetting.selectedValueChange && this.props.listItemSetting.selectedValueChange(selectedValue);
                                                      }}/>);
            return
        }
        if (this.props.hasSwitch) {
            this.switchOnValueChange(!this.state.switchState)
        }
    }

    _renderDescription(): any {
        let str;
        if (this.state.selectedItem)
            str = this.props.listItemSetting.getDescription(this.state.selectedItem);
        else
            str = this.state.customDes || this.props.des;
        if (str)
            return (<HTMLView style={{marginTop: 3}} value={str}/>)
    }

    render() {
        return (
            <Touchable style={[styles.container, this.props.style]} onPress={this.onPress}>
                {this.props.icon}
                <Col flex={1}>
                    <TextCustom value={this.props.title} style={[s.f_lar, s.black]}/>
                    {this._renderDescription()}
                </Col>
                {this.props.hasSwitch && <Switch style={{marginHorizontal: 8, alignSelf: "center"}}
                                                 onValueChange={this.switchOnValueChange.bind(this)}
                                                 value={this.state.switchState}/>}
                {this.props.hasNavArrow && RenderUtils.renderIcon("ios-arrow-forward", 20, "#6f6f6f",
                    {marginHorizontal: 8, alignSelf: "center"})}

            </Touchable>
        )
    }

    //region utils

    //endregion
}

const styles = StyleSheet.create({
    container: {flex: 1, flexDirection: 'row', padding: 15}
});
