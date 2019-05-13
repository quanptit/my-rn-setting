import React, {Component, ReactChild, ReactInstance} from 'react';
import {Linking, ScrollView, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {Button, ButtonModel, Col, StyleUtils, TextCustom, Touchable} from "my-rn-base-component";
import {getStringsCommon} from "my-rn-common-resource";
import {CommonUtils, PreferenceUtils} from "my-rn-base-utils";
import {ButtonKiemVang} from "my-rn-my-ads";
import {HeaderBar, HeaderColors} from "my-rn-header-bar";
import {ListSettingComponent, SettingItemObj} from "./ListSettingComponent";


export interface SettingScreenProps {
    headerColors: HeaderColors
    LINK_CONSTRACT: string
    /**reference to: UserUtils*/
    UserUtils: any
    loadListSettingItemAsync: () => Promise<SettingItemObj[]>
    style?: StyleProp<ViewStyle>
}

export class SettingScreen extends Component<SettingScreenProps, { title: string }> {

    constructor(props) {
        super(props);
        this.state = {title: this._isVip() ? "Me" : "Me (100 vàng)"};
    }

    async componentDidMount() {
        let title, dataObj;
        if (this.props.UserUtils != null)
            title = SettingScreen.getTitle(await PreferenceUtils.getNumberSetting("GOLD", 100));
        let newState: any = {};
        if (title != null) newState.title = title;
        this.setState(newState);
    }

    //region Header =======
    private _renderHeader() {
        return (
            <HeaderBar
                title={this.state.title}
                leftButton={{iconName: "md-arrow-back", onPress: CommonUtils.onBackPress}}
                renderRightAction={this._renderButtonGold.bind(this)}
                colors={this.props.headerColors}/>
        )
    }

    _renderButtonGold(): any {
        if (this._isVip()) return;
        return (<ButtonKiemVang title={getStringsCommon().kem_10_vang} isShowDialog={true} textStyle={{color: "white"}}
                                model={ButtonModel.transparent}
                                onShowAds={async () => {
                                    let gold = await PreferenceUtils.getNumberSetting("GOLD", 100);
                                    gold += 10;
                                    console.log("_Reward Received Callback: ", gold);
                                    await PreferenceUtils.saveSeting("GOLD", gold);
                                    this.updateGold(gold);
                                }}/>)
    }

    //endregion

    render() {
        return (
            <Col style={this.props.style} flex={1}>
                {this._renderHeader()}
                <ListSettingComponent loadListSettingItemAsync={this.props.loadListSettingItemAsync}
                />
            </Col>
        )
    }

    //region utils

    private updateGold(gold: number) {
        this.setState({title: SettingScreen.getTitle(gold)});
    }

    private static getTitle(gold: number) {
        return "Me (" + gold + " {0})".format(getStringsCommon().gold);
    }

    private _isVip() {
        let userObj = this.props.UserUtils && this.props.UserUtils.getUserObj();
        if (userObj)
            return userObj.isVip;
        return false;
    }

    static openScreen(props: SettingScreenProps) {
        CommonUtils.openScreen("SettingScreen", props);
    }

    //endregion
}
