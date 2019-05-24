import React, {Component, ReactElement, ReactInstance} from 'react';
import {StyleSheet, StyleProp, ViewStyle, Text, Image, ListRenderItem, ListRenderItemInfo, Linking} from "react-native";
import {Col, DialogUtils, FlatListLoad, RenderUtils, StyleUtils, TextCustom, Touchable} from "my-rn-base-component";
import {SettingCate} from "./SettingCate";
import {SettingItem} from "./SettingItem";
import {RowContact} from "./RowContact";
import {sendError} from "my-rn-base-utils";
import {RowSettingAccount} from "./RowSettingAccount";

interface Props {
    style?: StyleProp<ViewStyle>
    loadListSettingItemAsync: () => Promise<SettingItemObj[]>
    renderItem?: (info: ListRenderItemInfo<any>) => any
}

export type SettingItemObj = {
    isSession?: boolean, style?: any, title?: string,
    des?: string,
    switchSetting?: {
        switchState: () => Promise<boolean>
        switchOnValueChange: (value: boolean) => void
    }
    onPress?: (SettingItem) => void
    rowAccountSetting?: {
        callbackDongBoSuccess: VoidFunction,
        IAP_LICENSE_KEY: string
    }
    rowContact?: {
        LINK_CONSTRACT: string
    }
};

export class ListSettingComponent extends Component<Props, any> {
    //region defaultProps and Variable
    //endregion

    _renderItem(info: ListRenderItemInfo<any>) {
        if (this.props.renderItem != null) {
            let component = this.props.renderItem(info);
            if (component != null) return component;

        }
        let item = info.item as SettingItemObj;

        if (item.isSession) {
            if (item.title != null)
                return <SettingCate title={item.title}/>;

            return RenderUtils.renderSeparate([{marginVertical: 3}, item.style])
        }
        if (item.switchSetting) {
            return (
                <SettingItem
                    title={item.title}
                    des={item.des}
                    hasSwitch={true}
                    switchState={item.switchSetting.switchState}
                    switchOnValueChange={item.switchSetting.switchOnValueChange}/>
            );
        }
        if (item.onPress) {
            return (
                <SettingItem
                    title={item.title}
                    des={item.des}
                    hasSwitch={false}
                    onPress={item.onPress}
                />
            );
        }
        if (item.rowAccountSetting)
            return (
                <RowSettingAccount
                    callbackDongBoSuccess={item.rowAccountSetting.callbackDongBoSuccess}
                    IAP_LICENSE_KEY={item.rowAccountSetting.IAP_LICENSE_KEY}/>
            );
        if (item.rowContact) {
            return <RowContact LINK_CONSTRACT={item.rowContact.LINK_CONSTRACT}/>
        }

        sendError(item);
        return <Text>{`ERROR ==> Please Contact us: ${JSON.stringify(item)}`}</Text>
    }

    render() {
        return (
            <FlatListLoad style={this.props.style}
                          loadDataAsync={this.props.loadListSettingItemAsync}
                          renderItem={this._renderItem.bind(this)}
            />
        )
    }

    //region utils

    //endregion
}
