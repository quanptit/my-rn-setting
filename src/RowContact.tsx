import React, {Component, PureComponent} from 'react';
import {StyleSheet, StyleProp, ViewStyle, Text, Image, Linking} from "react-native";
import {StyleUtils, TextCustom, Touchable} from "my-rn-base-component";

const s = StyleUtils.getAllStyle();

interface Props {
    style?: StyleProp<ViewStyle>
    LINK_CONSTRACT: string
}

export class RowContact extends PureComponent<Props, any> {

    render() {
        return (
            <Touchable style={{paddingHorizontal: 6, paddingVertical: 9}}
                       onPress={() => {
                           Linking.openURL(this.props.LINK_CONSTRACT).catch(err => console.error('An error occurred', err))
                       }}>
                <TextCustom value="Contact us" style={[s.f_nor, {textAlign: "center"}]}/>
                <TextCustom value={this.props.LINK_CONSTRACT}
                            style={[s.f_lar, {
                                textAlignVertical: "center", textDecorationLine: "underline", color: '#007AFF',
                                textAlign: "center", textDecorationStyle: "solid", textDecorationColor: '#007AFF'
                            }]}/>
            </Touchable>
        )
    }

    //region utils

    //endregion
}
