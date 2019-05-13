import React, {Component, PureComponent} from 'react'
import {StyleSheet} from "react-native"
import {StyleUtils, TextCustom} from "my-rn-base-component";

const s = StyleUtils.getAllStyle();

interface Props {
    title: string
}

export class SettingCate extends PureComponent<Props> {
    //region defaultProps and Variable
    //endregion

    render() {
        return (
            <TextCustom value={this.props.title} style={[s.f_nor, styles.text]}/>
        )
    }
}

const styles = StyleSheet.create({
    text: {color: "#00b3cc", fontWeight: "500", paddingTop: 12, paddingBottom: 3, paddingLeft: 15}
});
