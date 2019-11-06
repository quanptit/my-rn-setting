import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Button, ButtonModel, DialogUtils, RenderUtils, StyleUtils, TextCustom, Toast} from "my-rn-base-component";
import {getStringsCommon} from "my-rn-common-resource";
import {DialogLogin, UserUtils} from "my-rn-login";
import {CommonUtils} from "my-rn-base-utils";
import {DialogPaymentChoose} from "my-rn-payment";
import {FirebaseUtils} from "my-rn-firebase";

const s = StyleUtils.getAllStyle();

interface Props {
    // callbackLoginSuccess: (iSuccess: boolean) => void
    callbackDongBoSuccess: VoidFunction
    IAP_LICENSE_KEY: string
    style?: StyleProp<ViewStyle>
}

// RowSettingAccount trong setting screen
export class RowSettingAccount extends PureComponent<Props> {

    btnLoginClick() {
        DialogUtils.showDialog(<DialogLogin callbackLoginSuccess={async () => {
            await this._dongBo(false);
            CommonUtils.openScreen("Drawer", null, "reset")
        }}/>);
    }

    btnNangCapVipClick() {
        DialogUtils.showDialog(<DialogPaymentChoose
            callbackUpdateVip={async () => {
                await UserUtils.setVipUser();
                this.forceUpdate();
            }}
            IAP_LICENSE_KEY={this.props.IAP_LICENSE_KEY}/>)
    }

    btnDongBoClick() {
        DialogUtils.showQuestionDialog(null, getStringsCommon().dong_bo_tai_khoan_msg, {
            text: getStringsCommon().dong_bo_ngay.toUpperCase(), onPress: async () => {
                return this._dongBo(true);
            }
        }, {text: getStringsCommon().Cancel.toUpperCase()})
    }

    private async _dongBo(isCallCallback: boolean) {
        DialogUtils.showProgressDialog(getStringsCommon().dang_dong_do, true);
        try {
            await FirebaseUtils.asyncDatabaseFromFirebase();
            Toast.showLongBottom(getStringsCommon().success);
            this.props.callbackDongBoSuccess()
        } catch (e) {
            console.log("ERROR: ", e);
            Toast.showLongBottom(getStringsCommon().has_error)
        }
        DialogUtils.hideDialog()
    }

    render() {
        let isLogged = UserUtils.isLogged();
        return (
            <View style={{marginBottom: 16}}>
                {RenderUtils.renderMaterialIcon("account-circle", 40, "#b7b7b7",
                    {alignSelf: "center", marginTop: 9})}
                <TextCustom value={UserUtils.getNameOfUser()}
                            style={[s.f_lar, {marginTop: 6, textAlign: "center", color: "black", fontWeight: "500"}]}/>
                {isLogged ? this._renderAccountStatistic() : this._renderButtonLogin()}
            </View>
        )
    }

    private _renderButtonLogin() {
        return <Button key="2"
                       model={ButtonModel.primary}
                       title={getStringsCommon().Click_dang_nhap_dong_bo.toUpperCase()}
                       onPress={this.btnLoginClick.bind(this)}
                       textStyle={s.f_smal} style={styles.button}/>;
    }

    private _renderAccountStatistic() {
        let isVip = UserUtils.getUserObj().isVip;
        let result = [];
        result.push(<TextCustom key="1" value={isVip ? "(Vip Account)" : "(Free Account)"}
                                style={[s.f_nor, {marginTop: 5, alignSelf: "center", color: "gray", fontWeight: "300"}]}/>);
        if (!isVip)
            result.push(<Button key="2" model={ButtonModel.danger} title={getStringsCommon().nang_cap_vip}
                                onPress={this.btnNangCapVipClick.bind(this)}
                                textStyle={s.f_smal} style={styles.button}/>);
        result.push(<Button key="3" model={ButtonModel.light} title={getStringsCommon().dong_bo_tai_khoan}
                            onPress={this.btnDongBoClick.bind(this)}
                            textStyle={s.f_smal} style={styles.button}/>);
        return result
    }

    //region utils

    //endregion
}

const styles = StyleSheet.create({
    button: {marginTop: 5, alignSelf: "center", width: 220}
});
